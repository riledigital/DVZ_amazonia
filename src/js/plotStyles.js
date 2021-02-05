// Spec generator functions
const globalPlotConfig = {
  axis: {
    labelFont: 'Source Serif Pro',
    labelFontSize: 13,
    titleFont: 'Source Serif Pro'
  },
  legend: {
    titleFont: 'Source Serif Pro',
    labelFont: 'Source Serif Pro'
  },
  title: {
    font: 'Source Serif Pro',
    fontSize: 20
  },
  background: 'rgba(0,0,0,0)'
};

// These are the line graphs for each area
export const makeLineGraph = function(data) {
  return {
    config: globalPlotConfig,
    width: 'container',
    height: 'container',
    data: {
      url: data,
      format: {
        type: 'csv'
      }
    },
    layer: [
      {
        encoding: {
          x: {
            field: 'acq_year',
            type: 'temporal',
            axis: {
              title: 'Acquisition year'
            }
          },
          y: {
            field: 'count',
            type: 'quantitative',
            axis: {
              title: 'Total fire count'
            },
            scale: {
              domain: [0,
                8000]
            }
          }
        },
        layer: [
          {
            mark: 'line'
          },
          {
            selection: {
              label: {
                type: 'single',
                nearest: true,
                on: 'mouseover',
                encodings: ['x'],
                empty: 'none'
              }
            },
            mark: 'point',
            encoding: {
              opacity: {
                condition: {
                  selection: 'label',
                  value: 1
                },
                value: 0
              }
            }
          }
        ]
      },
      {
        transform: [{
          filter: {
            selection: 'label'
          }
        }],
        layer: [
          {
            mark: {
              type: 'rule',
              color: 'gray'
            },
            encoding: {
              x: {
                type: 'temporal',
                field: 'acq_year'
              }
            }
          },
          {
            encoding: {
              text: {
                type: 'quantitative',
                field: 'count'
              },
              x: {
                type: 'temporal',
                field: 'acq_year'
              },
              y: {
                type: 'quantitative',
                field: 'count'
              }
            },
            layer: [
              {
                mark: {
                  type: 'text',
                  fontSize: 18,
                  stroke: 'white',
                  strokeWidth: 3,
                  align: 'right',
                  dx: -8,
                  dy: 2
                }
              },
              {
                mark: {
                  type: 'text',
                  fontSize: 18,
                  align: 'right',
                  dx: -8,
                  dy: 2
                },
                encoding: {
                  color: {
                    type: 'nominal',
                    field: 'groupname',
                    title: 'indigenous land',
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

export const makeMultiLine = function(data) {
  return {
    config: globalPlotConfig,
    width: 'container',
    height: 'container',
    data: {
      url: data,
      format: {
        type: 'csv'
      }
    },
    layer: [
      {
        encoding: {
          x: {
            field: 'acq_year',
            type: 'temporal',
            axis: {
              title: 'acquisition year'
            }
          },
          y: {
            field: 'count',
            type: 'quantitative',
            axis: {
              title: 'total fire count'
            }
          },
          color: {
            field: 'groupname',
            title: 'indigenous land',
            type: 'nominal'
          }
        },
        layer: [
          {
            mark: 'line'
          },
          {
            selection: {
              label: {
                type: 'single',
                nearest: true,
                on: 'mouseover',
                encodings: ['x'],
                empty: 'none'
              }
            },
            mark: 'point',
            encoding: {
              opacity: {
                condition: {
                  selection: 'label',
                  value: 1
                },
                value: 0
              }
            }
          }
        ]
      },
      {
        transform: [{
          filter: {
            selection: 'label'
          }
        }],
        layer: [
          {
            mark: {
              type: 'rule',
              color: 'gray'
            },
            encoding: {
              x: {
                type: 'temporal',
                field: 'acq_year'
              }
            }
          },
          {
            encoding: {
              text: {
                type: 'quantitative',
                field: 'count'
              },
              x: {
                type: 'temporal',
                field: 'acq_year'
              },
              y: {
                type: 'quantitative',
                field: 'count'
              }
            },
            layer: [
              {
                mark: {
                  type: 'text',
                  fontSize: 18,
                  stroke: 'white',
                  strokeWidth: 3,
                  align: 'right',
                  dx: -8,
                  dy: 2
                }
              },
              {
                mark: {
                  type: 'text',
                  fontSize: 18,
                  align: 'right',
                  dx: -8,
                  dy: 2
                },
                encoding: {
                  color: {
                    type: 'nominal',
                    field: 'symbol',
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

export const makeAreaGraph = function (data) {
  return {
    config: globalPlotConfig,
    width: 'container',
    height: 500,
    data: {
      url: data,
      format: {
        type: 'csv'
      }
    },
    mark: {
      type: 'area',
      tooltip: true
    },

    selection: {
      area: {
        type: 'single',
        on: 'mouseover'
      }
    },
    encoding: {
      color: {
        legend: {
          orient: 'bottom-left'
        },
        condition: {
          selection: 'area',
          field: 'groupname',
          title: 'indigenous land',
          type: 'nominal',
          scale: {
            scheme: 'plasma',
            reverse: true
          }
        },
        value: 'black'
      },

      x: {
        type: 'temporal',
        axis: {
          title: 'acquisition year'
        },
        field: 'acq_year'
      },
      tooltip: [
        {
          field: 'groupname',
          type: 'nominal',
          title: 'indigenous land'
        },

        {
          field: 'count',
          type: 'quantitative',
          title: 'year total fire count'
        },

        {
          field: 'total',
          type: 'quantitative',
          title: 'cumulative total fire count'
        }
      ],
      y: {
        aggregate: 'sum',
        field: 'count',
        type: 'quantitative',
        axis: {
          title: 'total fire count'
        }
      }
    }
  };
};
