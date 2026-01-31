// Access the global mapData and mapLayout
// mapData is an array. The main scattermapbox trace is likely index 0.

document.addEventListener('DOMContentLoaded', () => {
    if (typeof mapData === 'undefined' || !mapData || mapData.length === 0) {
        console.error("No map data found.");
        return;
    }

    const mainTrace = mapData[0];

    // Extract relevant data for processing
    // structure:
    // mainTrace.lat (array)
    // mainTrace.lon (array)
    // mainTrace.customdata (array of arrays): [price, beds, baths, sqft, is_luxury, is_penthouse]
    // mainTrace.marker.color (array): yield values
    // mainTrace.hovertext (array): address strings (implied)

    const listings = mainTrace.lat.map((lat, i) => {
        // Safe access to properties
        const yieldVal = mainTrace.marker && mainTrace.marker.color ? mainTrace.marker.color[i] : 0;
        const custom = mainTrace.customdata ? mainTrace.customdata[i] : [0,0,0,0,0,0];
        const hover = mainTrace.hovertext ? mainTrace.hovertext[i] : "Unknown Address";

        // Clean up address (hovertext often has <br> or extra info)
        // Usually hovertext is like "Address<br>Price: ...<br>..."
        // Let's try to take the first line if it contains <br>
        let address = hover;
        if (address.includes('<br>')) {
            address = address.split('<br>')[0];
        }

        return {
            id: i,
            lat: lat,
            lon: mainTrace.lon[i],
            yield: yieldVal,
            price: custom[0],
            beds: custom[1],
            baths: custom[2],
            sqft: custom[3],
            isLuxury: custom[4],
            address: address
        };
    });

    // Sort by yield descending
    const sortedListings = [...listings].sort((a, b) => b.yield - a.yield);
    const top5 = sortedListings.slice(0, 5);

    // Render Top 5 List
    const listContainer = document.getElementById('top-listings-list');
    
    if (listContainer) {
        top5.forEach((item, index) => {
            const li = document.createElement('li');
            li.className = 'listing-item';
            
            // Format price: $1.2M or $500k
            let priceStr = '';
            if (item.price >= 1000000) {
                priceStr = `$${(item.price / 1000000).toFixed(2)}M`;
            } else {
                priceStr = `$${(item.price / 1000).toFixed(0)}k`;
            }

            // Yield percentage
            // Assuming the value is raw (e.g. 0.05 for 5%) or percent (e.g. 5.0)
            // Need to check range. If > 1, assume percent. If < 1, assume decimal.
            // But looking at colorbars usually 5-10 range is common.
            // Let's print one to console to be sure in dev, but for now just display as is with %
            // If it's like 0.05, multiplying by 100 gives 5.
            
            // Wait, looking at typical plotly colorbars, it's often the raw value plotted.
            // Let's assume it is percentage value directly if > 1, or decimal if < 1.
            // Actually, safe bet is just display it.
            
            let yieldDisplay = item.yield;
            // Heuristic: if all top 5 are < 1, it's likely decimal.
            const allSmall = top5.every(l => l.yield < 1);
            if (allSmall) {
                yieldDisplay = (item.yield * 100).toFixed(1);
            } else {
                yieldDisplay = item.yield.toFixed(1);
            }

            li.innerHTML = `
                <div class="listing-header">
                    <div class="listing-address" title="${item.address}">${item.address}</div>
                    <div class="listing-yield">${yieldDisplay}%</div>
                </div>
                <div class="listing-details">
                    <span class="listing-price">${priceStr}</span>
                    <span>${item.beds} BD</span>
                    <span>${item.baths} BA</span>
                    <span>${item.sqft} sqft</span>
                </div>
            `;
            
            li.addEventListener('click', () => {
                // Fly to location
                const mapDiv = document.getElementById('map-container');
                
                // Use Plotly relayout to zoom
                const update = {
                    'mapbox.center': { lat: item.lat, lon: item.lon },
                    'mapbox.zoom': 15
                };
                Plotly.relayout(mapDiv, update);
            });
            
            listContainer.appendChild(li);
        });
    }

    // Initialize Map
    // We need to modify the layout slightly to fit our new container and maybe update styles
    const layout = {
        ...mapLayout,
        margin: { t: 0, b: 0, l: 0, r: 0 },
        height: undefined, // Let it fill container
        width: undefined,
        mapbox: {
            ...mapLayout.mapbox,
            style: "carto-darkmatter" // Force dark theme
        },
        paper_bgcolor: '#121212',
        plot_bgcolor: '#121212',
        showlegend: false
    };

    Plotly.newPlot('map-container', mapData, layout, { responsive: true });
});
