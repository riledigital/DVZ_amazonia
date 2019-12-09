// This is where you should declare your (vega) plots 

// README!
// Syntax for the plots
// 
// FOR CSS selectors also!
// <div id="parque_linegraph"> </div>
// FOR JS variables,:
// {article}_{type of plot}
// EG: parque_linegraph

// ;)
var parque_linegraph = {   
  // $schema: "https://vega.github.io/schema/vega-lite/v4.json",
  width: "800",
  height: "300",
  data: {
    url: "https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2Fparque_linegraph.csv?v=1575833062445v",
    format: {
      type: "csv"
    }
  },
  layer: [
    {
      encoding: {
        x: {field: "acq_year", type: "temporal"},
        y: {field: "count", type: "quantitative"}
      },
      layer: [
        {mark: "line"},
        {
          selection: {
            label: {
              type: "single",
              nearest: true,
              on: "mouseover",
              encodings: ["x"],
              empty: "none"
            }
          },
          mark: "point",
          encoding: {
            opacity: {
              condition: {selection: "label", value: 1},
              value: 0
            }
          }
        }
      ]
    },
    {
      transform: [{filter: {selection: "label"}}],
      layer: [
        {
          mark: {type: "rule", color: "gray"},
          encoding: {
            x: {type: "temporal", field: "acq_year"}
          }
        },
        {
          encoding: {
            text: {type: "quantitative", field: "count"},
            "x": {"type": "temporal", field: "acq_year"},
            "y": {"type": "quantitative", field: "count"}
          },
          "layer": [
            {
              "mark": {
                "type": "text",
                "stroke": "white",
                "strokeWidth": 2,
                "align": "left",
                "dx": 5,
                "dy": -5
              }
            },
            {
              "mark": {"type": "text", "align": "left", "dx": 5, "dy": -5},
              "encoding": {
                "color": {"type": "nominal", "field": "symbol", "legend": null}
              }
            }
          ]
        }
      ]
    }
  ]
};

vegaEmbed("#parque_linegraph", parque_linegraph);