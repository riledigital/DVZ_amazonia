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
var linegraph = function(data) {
  return {
    width: 960,
    height: 540,
    data: {
      url: data,
      format: {
        type: "csv"
      }
    },
    layer: [
      {
        
        encoding: {
          x: {
            field: "acq_year",
            type: "temporal",
            axis: { title: "Acquisition year" }
          },
          y: {
            field: "count",
            type: "quantitative",
            axis: { title: "Total fire count" }
          }
        },
        layer: [
          { mark: "line" },
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
                condition: { selection: "label", value: 1 },
                value: 0
              }
            }
          }
        ]
      },
      {
        transform: [{ filter: { selection: "label" } }],
        layer: [
          {
            mark: { type: "rule", color: "gray" },
            encoding: {
              x: { type: "temporal", field: "acq_year" }
            }
          },
          {
            encoding: {
              text: { type: "quantitative", field: "count" },
              x: { type: "temporal", field: "acq_year" },
              y: { type: "quantitative", field: "count" }
            },
            layer: [
              {
                mark: {
                  type: "text",
                  fontSize: 18,
                  stroke: "white",
                  strokeWidth: 3,
                  align: "right",
                  dx: -8,
                  dy: 2
                }
              },
              {
                mark: { type: "text", fontSize: 18, align: "right", dx: -8, dy: 2 },
                encoding: {
                  color: { type: "nominal", field: "symbol", legend: null }
                }
              }
            ]
          }
        ]
      }
    ]
  };
};

var parque_linegraph = linegraph(
  "https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2Fparque_linegraph.csv?v=1575833062445"
);
var ara_linegraph = linegraph(
  "https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2Fara_linegraph.csv?v=1575833062680"
);
var marai_linegraph = linegraph(
  "https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2FMaraiwatsede_linegraph.csv?v=1575833062211"
);

vegaEmbed("#parque_linegraph", parque_linegraph);
vegaEmbed("#ara_linegraph", ara_linegraph);
vegaEmbed("#marai_linegraph", marai_linegraph);
