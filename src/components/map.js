import React, { useState } from "react"
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps"
import { Tooltip } from "react-tooltip"
import * as classes from "../styles/map.module.sass"

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

// Fun facts mapping by country name or ISO
const funFacts = {
  "United States of America": "Founding member of NATO and the UN. Key player in the Cold War.",
  "Russia": "Successor state to the Soviet Union. Permanent member of the UN Security Council.",
  "China": "A rising global power, central to the 'Belt and Road Initiative'.",
  "United Kingdom": "Former global empire, key architect of the post-WWII international order.",
  "France": "A nuclear power and a leading force within the European Union.",
  "Germany": "Reunified in 1990, now the economic powerhouse of Europe.",
  "India": "A founding member of the Non-Aligned Movement during the Cold War.",
  "Brazil": "A major player in the Global South and BRICS.",
  "South Africa": "Overcame apartheid to become a leading diplomatic voice in Africa.",
  "Japan": "Adopted a pacifist constitution post-WWII, focuses on economic diplomacy.",
  "Indonesia": "Hosted the historic 1955 Bandung Conference, pivotal for the Non-Aligned Movement."
}

const GeoMap = () => {
  const [tooltipContent, setTooltipContent] = useState("")

  return (
    <div className={classes.mapContainer}>
      <h3 className={classes.title}>Peta Geopolitik Interaktif</h3>
      <p className={classes.subtitle}>Klik negara untuk melihat profil sejarah HI-nya.</p>
      
      <div className={classes.mapWrapper}>
        <ComposableMap projectionConfig={{ scale: 140 }} width={800} height={400}>
          <ZoomableGroup>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const countryName = geo.properties.name;
                  const fact = funFacts[countryName] || "Fakta geopolitik belum tersedia untuk negara ini.";
                  
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => {
                        setTooltipContent(`${countryName} - ${fact}`);
                      }}
                      onMouseLeave={() => {
                        setTooltipContent("");
                      }}
                      onClick={() => {
                        alert(`Profil: ${countryName}\n\n${fact}`)
                      }}
                      style={{
                        default: {
                          fill: "#D6D6DA",
                          outline: "none",
                          transition: "all 250ms"
                        },
                        hover: {
                          fill: "#4facfe",
                          outline: "none",
                          cursor: "pointer"
                        },
                        pressed: {
                          fill: "#00f2fe",
                          outline: "none"
                        }
                      }}
                    />
                  )
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
        {tooltipContent && (
          <div className={classes.tooltip}>
            {tooltipContent}
          </div>
        )}
      </div>
    </div>
  )
}

export default GeoMap
