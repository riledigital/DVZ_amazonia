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
            axis: { title: "acquisition year" }
          },
          y: {
            field: "count",
            type: "quantitative",
            axis: { title: "total fire count" }
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
                mark: {
                  type: "text",
                  fontSize: 18,
                  align: "right",
                  dx: -8,
                  dy: 2
                },
                encoding: {
                  color: {
                    type: "nominal",
                    field: "groupname",
                    title: "indigenous land",
                    legend: null
                  }
                }
              }
            ]
          }
        ]
      }
    ]
  };
};

var multi_linegraph = function(data) {
  return {
    width: 700,
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
            axis: { title: "acquisition year" }
          },
          y: {
            field: "count",
            type: "quantitative",
            axis: { title: "total fire count" }
          },
          color: {
            field: "groupname",
            title: "indigenous land",
            type: "nominal"
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
                mark: {
                  type: "text",
                  fontSize: 18,
                  align: "right",
                  dx: -8,
                  dy: 2
                },
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

var areagraph = function(data) {
  return {
    config: { view: { width: 700, height: 600 } },
    title: "Indigenous Region Fire Count (2001–2019)",
    data: {
      url:
        data,
      format: { type: "csv" }
    },
    mark: { type: "area", tooltip: true },

    selection: {
      area: { type: "single", on: "mouseover" }
    },

    encoding: {
      color: {
        condition: {
          selection: "area",
          field: "groupname",
          title: "indigenous land",
          type: "nominal",
          scale: { scheme: "plasma", reverse: true }
        },
        value: "black"
      },

      x: {
        type: "temporal",
        axis: { title: "acquisition year" },
        field: "acq_year"
        // timeUnit: "year"
      },
       "tooltip": [{"field": "groupname", "type": "nominal", "title": "indigenous land"},
      
      {"field": "count", "type": "quantitative", "title": "year total fire count"},
                   
            {"field": "total", "type": "quantitative", "title":"cumulative total fire count"}
    ],
      y: {
        aggregate: "sum",
        field: "count",
        type: "quantitative",
        axis: { title: "total fire count" }
      }
    }
  };
};

var focus_regions_linegraph = multi_linegraph(
  "https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2Ffocus_regions_linegraph.csv?v=1575991690328"
);

var parque_linegraph = linegraph(
  "https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2Fparque_linegraph.csv?v=1575833062445"
);
var ara_linegraph = linegraph(
  "https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2Fara_linegraph.csv?v=1575833062680"
);
var marai_linegraph = linegraph(
  "https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2FMaraiwatsede_linegraph.csv?v=1575833062211"
);

var top10_areagraph = areagraph(
  "https://cdn.glitch.com/e0876ad4-2883-4d2f-bf08-a90e9d4b0b1e%2Ftop_10_firecount_of_total.csv?v=1576026693381"
);

vegaEmbed("#focus_regions_linegraph", focus_regions_linegraph);
vegaEmbed("#parque_linegraph", parque_linegraph);
vegaEmbed("#ara_linegraph", ara_linegraph);
vegaEmbed("#marai_linegraph", marai_linegraph);
vegaEmbed("#top10_areagraph", top10_areagraph);
