/*!
  Copyright 2018 Google LLC

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

  https://www.apache.org/licenses/LICENSE-2.0

  Unless mind by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
import * as sut from '../src/index';
import {
  DSInteractionData,
  DSInteractionType,
  InteractionsById,
  InteractionType,
  ThemeStyle,
} from '../src/index';

const dsInteractions: DSInteractionData[] = [
  {
    id: 'interactionsConfigId',
    value: {
      type: DSInteractionType.FILTER,
      data: {
        concepts: ['qt_h6oibrb6wb', 'qt_i6oibrb6wb'],
        values: [
          ['Afternoon', 'Sunday'],
          ['Afternoon', 'Thursday'],
          ['Morning', 'Tuesday'],
        ],
      },
    },
    supportedActions: [DSInteractionType.FILTER],
  },
];

const interactionsById: InteractionsById = {
  interactionsConfigId: {
    value: {
      type: InteractionType.FILTER,
      data: {
        concepts: ['qt_h6oibrb6wb', 'qt_i6oibrb6wb'],
        values: [
          ['Afternoon', 'Sunday'],
          ['Afternoon', 'Thursday'],
          ['Morning', 'Tuesday'],
        ],
      },
    },
    supportedActions: [InteractionType.FILTER],
  },
};

const theme: ThemeStyle = {
  themeFillColor: {
    color: '#ffffff',
    themeRef: {
      index: 0,
    },
  },
  themeFontColor: {
    color: '#000000',
    themeRef: {
      index: 1,
    },
  },
  themeFontFamily: 'Roboto',
  themeAccentFillColor: {
    color: '#e0e0e0',
    themeRef: {
      index: 2,
    },
  },
  themeAccentFontColor: {
    color: '#000000',
    themeRef: {
      index: 3,
    },
  },
  themeAccentFontFamily: 'Roboto',
  themeSeriesColor: [
    {
      color: '#0072f0',
      seriesRef: {
        index: 0,
      },
      themeRef: {
        index: 4,
      },
    },
    {
      color: '#00b6cb',
      seriesRef: {
        index: 1,
      },
      themeRef: {
        index: 5,
      },
    },
    {
      color: '#f10096',
      seriesRef: {
        index: 2,
      },
      themeRef: {
        index: 6,
      },
    },
    {
      color: '#f66d00',
      seriesRef: {
        index: 3,
      },
      themeRef: {
        index: 7,
      },
    },
    {
      color: '#ffa800',
      seriesRef: {
        index: 4,
      },
      themeRef: {
        index: 8,
      },
    },
    {
      color: '#7cb342',
      seriesRef: {
        index: 5,
      },
      themeRef: {
        index: 9,
      },
    },
    {
      color: '#5e35b1',
      seriesRef: {
        index: 6,
      },
    },
    {
      color: '#03a9f4',
      seriesRef: {
        index: 7,
      },
    },
    {
      color: '#ec407a',
      seriesRef: {
        index: 8,
      },
    },
    {
      color: '#ff7043',
      seriesRef: {
        index: 9,
      },
    },
    {
      color: '#737373',
      seriesRef: {
        index: 10,
      },
    },
    {
      color: '#f15a60',
      seriesRef: {
        index: 11,
      },
    },
    {
      color: '#7ac36a',
      seriesRef: {
        index: 12,
      },
    },
    {
      color: '#5a9bd4',
      seriesRef: {
        index: 13,
      },
    },
    {
      color: '#faa75a',
      seriesRef: {
        index: 14,
      },
    },
    {
      color: '#9e67ab',
      seriesRef: {
        index: 15,
      },
    },
    {
      color: '#ce7058',
      seriesRef: {
        index: 16,
      },
    },
    {
      color: '#d77fb3',
      seriesRef: {
        index: 17,
      },
    },
    {
      color: '#81d4fa',
      seriesRef: {
        index: 18,
      },
    },
    {
      color: '#f48fb1',
      seriesRef: {
        index: 19,
      },
    },
  ],
  themeIncreaseColor: {
    color: '#388e3c',
  },
  themeDecreaseColor: {
    color: '#f44336',
  },
  themeGridColor: {
    color: '#d1d1d1',
  },
};

const testDimensionFields = (numRequested: number): sut.Field[] => {
  const fields = [
    {
      id: 'dimensionField1Id',
      name: 'dimensionField1Name',
      description: 'dimensionField1Description',
      type: sut.FieldType.TEXT,
      concept: sut.ConceptType.DIMENSION,
    },
    {
      id: 'dimensionField2Id',
      name: 'dimensionField2Name',
      description: 'dimensionField2Description',
      type: sut.FieldType.BOOLEAN,
      concept: sut.ConceptType.DIMENSION,
    },
  ];
  if (numRequested > fields.length) {
    throw new Error(`Can't support ${numRequested} fields yet.`);
  }
  return fields.splice(0, numRequested);
};

const testMetricFields = (numRequested: number): sut.Field[] => {
  const fields = [
    {
      id: 'metricField1Id',
      name: 'metricField1Name',
      description: 'metricField1Description',
      type: sut.FieldType.NUMBER,
      concept: sut.ConceptType.METRIC,
    },
    {
      id: 'metricField2Id',
      name: 'metricField2Name',
      description: 'metricField2Description',
      type: sut.FieldType.PERCENT,
      concept: sut.ConceptType.METRIC,
    },
  ];
  if (numRequested > fields.length) {
    throw new Error(`Can't support ${numRequested} fields yet.`);
  }
  return fields.splice(0, numRequested);
};

const testDateRange = (numRequested: number): sut.DSDateRange[] => {
  const dateRanges = [
    {
      id: sut.DateRangeType.DEFAULT,
      start: '20200130',
      end: '20210130',
    },
    {
      id: sut.DateRangeType.COMPARISON,
      start: '20190130',
      end: '20200130',
    },
  ];
  if (numRequested > 2) {
    throw new Error(`Can't support ${numRequested} date ranges.`);
  }
  return dateRanges.splice(0, numRequested);
};

const testStyle = (numRequested: number): sut.StyleEntry[] => {
  const styleElements: sut.ConfigStyle[] = [
    {
      id: 'styleId',
      label: 'styleLabel',
      elements: [
        {
          id: 'styleInnerId1',
          type: sut.ConfigStyleElementType.FILL_COLOR,
          label: 'This is a fill color label',
          defaultValue: '13',
          value: '12',
        },
      ],
    },
    {
      id: 'styleId2',
      label: 'styleLabel2',
      elements: [
        {
          id: 'styleInnerId2',
          type: sut.ConfigStyleElementType.AXIS_COLOR,
          label: 'This is an axis color label',
          defaultValue: '3',
          value: '4',
        },
      ],
    },
  ];
  if (numRequested > styleElements.length) {
    throw new Error(`Can't support ${numRequested} fields yet.`);
  }
  return styleElements.splice(0, numRequested);
};

const testMessage = (
  numDimensions: number,
  numMetrics: number,
  numStyle: number,
  numDateRange: number
): sut.Message => {
  const dimensionFields = testDimensionFields(numDimensions);
  const metricFields = testMetricFields(numMetrics);
  const fields = dimensionFields.concat(metricFields);
  const style = testStyle(numStyle);
  const dateRanges = testDateRange(numDateRange);
  return {
    type: sut.MessageType.RENDER,
    config: {
      interactions: dsInteractions,
      data: [
        {
          id: 'configId',
          label: 'configLabel',
          elements: [
            {
              type: sut.ConfigDataElementType.DIMENSION,
              id: 'dimensions',
              label: 'configDimension1Label',
              options: {
                min: 1,
                max: numDimensions,
                supportedTypes: [],
              },
              value: dimensionFields.map((a) => a.id),
            },
            {
              type: sut.ConfigDataElementType.METRIC,
              id: 'metrics',
              label: 'configMetric1Label',
              options: {
                min: 1,
                max: numMetrics,
              },
              value: metricFields.map((a) => a.id),
            },
          ],
        },
      ],
      style,
      themeStyle: theme,
    },
    fields,
    dataResponse: {
      tables: [
        {
          id: sut.TableType.DEFAULT,
          fields: fields.map((a) => a.id),
          rows: [1, 2].map((num) => {
            return fields.map((a) => {
              switch (a.type) {
                case sut.FieldType.TEXT:
                  return '' + num;
                case sut.FieldType.NUMBER:
                  return num;
                case sut.FieldType.BOOLEAN:
                  return num % 2 === 0;
                case sut.FieldType.PERCENT:
                  return num / 100.0;
                default:
                  throw new Error(`${a.type} is not supported yet.`);
              }
            });
          }),
        },
        {
          id: sut.TableType.COMPARISON,
          fields: fields.map((a) => a.id),
          rows: [1, 2].map((num) => {
            return fields.map((a) => {
              switch (a.type) {
                case sut.FieldType.TEXT:
                  return '' + num;
                case sut.FieldType.NUMBER:
                  return num;
                case sut.FieldType.BOOLEAN:
                  return num % 2 === 0;
                case sut.FieldType.PERCENT:
                  return num / 100.0;
                default:
                  throw new Error(`${a.type} is not supported yet.`);
              }
            });
          }),
        },
      ],
      dateRanges,
    },
  };
};

test('subscribeToData works with colorMap', () => {
  window.history.replaceState({}, 'Test Title', '/test?dscId=my-id');
  const message = testMessage(1, 1, 1, 0);
  const addEventListenerMock = jest.fn((event, cb) => {
    if (event === 'message') {
      cb({data: message});
    } else {
      throw new Error('unsupported event type for testing');
    }
  });

  const postMessageMock = jest.fn();
  const removeEventListenerMock = jest.fn();

  window.addEventListener = addEventListenerMock;
  window.parent.postMessage = postMessageMock;
  window.removeEventListener = removeEventListenerMock;
  // This is a hack since we can't do `window.frameElement = {...}`
  Object.defineProperty(window, 'frameElement', {
    get: () => ({
      getAttribute: () => '123',
    }),
  });

  const unSub = sut.subscribeToData(
    (actual: sut.TableFormat) => {
      expect(actual).toEqual(sut.tableTransform(message));
    },
    {transform: sut.tableTransform}
  );
  unSub();
  expect(removeEventListenerMock.mock.calls.length).toBeGreaterThan(0);
});

test('subscribeToData works', () => {
  window.history.replaceState({}, 'Test Title', '/test?dscId=my-id');
  const message = testMessage(1, 1, 1, 0);
  const addEventListenerMock = jest.fn((event, cb) => {
    if (event === 'message') {
      cb({data: message});
    } else {
      throw new Error('unsupported event type for testing');
    }
  });

  const postMessageMock = jest.fn();
  const removeEventListenerMock = jest.fn();

  window.addEventListener = addEventListenerMock;
  window.parent.postMessage = postMessageMock;
  window.removeEventListener = removeEventListenerMock;
  // This is a hack since we can't do `window.frameElement = {...}`
  Object.defineProperty(window, 'frameElement', {
    get: () => ({
      getAttribute: () => '123',
    }),
  });

  const unSub = sut.subscribeToData(
    (actual: sut.TableFormat) => {
      expect(actual).toEqual(sut.tableTransform(message));
    },
    {transform: sut.tableTransform}
  );
  unSub();
  expect(removeEventListenerMock.mock.calls.length).toBeGreaterThan(0);
});

test('tableTransform empty style', () => {
  const expectedFields = {
    dimensions: [
      {
        id: 'dimensionField1Id',
        name: 'dimensionField1Name',
        description: 'dimensionField1Description',
        type: sut.FieldType.TEXT,
        concept: sut.ConceptType.DIMENSION,
      },
      {
        id: 'dimensionField2Id',
        name: 'dimensionField2Name',
        description: 'dimensionField2Description',
        type: sut.FieldType.BOOLEAN,
        concept: sut.ConceptType.DIMENSION,
      },
    ],
    metrics: [
      {
        id: 'metricField1Id',
        name: 'metricField1Name',
        description: 'metricField1Description',
        type: sut.FieldType.NUMBER,
        concept: sut.ConceptType.METRIC,
      },
      {
        id: 'metricField2Id',
        name: 'metricField2Name',
        description: 'metricField2Description',
        type: sut.FieldType.PERCENT,
        concept: sut.ConceptType.METRIC,
      },
    ],
  };
  const expected: sut.TableFormat = {
    dateRanges: {},
    interactions: interactionsById,
    fields: expectedFields,
    tables: {
      [sut.TableType.DEFAULT]: {
        headers: [
          {
            ...expectedFields.dimensions[0],
            configId: 'dimensions',
          },
          {
            ...expectedFields.dimensions[1],
            configId: 'dimensions',
          },
          {
            ...expectedFields.metrics[0],
            configId: 'metrics',
          },
          {
            ...expectedFields.metrics[1],
            configId: 'metrics',
          },
        ],
        rows: [
          ['1', false, 1, 0.01],
          ['2', true, 2, 0.02],
        ],
      },
      [sut.TableType.COMPARISON]: {
        headers: [
          {
            ...expectedFields.dimensions[0],
            configId: 'dimensions',
          },
          {
            ...expectedFields.dimensions[1],
            configId: 'dimensions',
          },
          {
            ...expectedFields.metrics[0],
            configId: 'metrics',
          },
          {
            ...expectedFields.metrics[1],
            configId: 'metrics',
          },
        ],
        rows: [
          ['1', false, 1, 0.01],
          ['2', true, 2, 0.02],
        ],
      },
    },
    style: {},
    theme,
  };
  const actual = sut.tableTransform(testMessage(2, 2, 0, 0));
  expect(actual).toEqual(expected);
});

test('tableTransform works', () => {
  const expectedFields = {
    dimensions: [
      {
        id: 'dimensionField1Id',
        name: 'dimensionField1Name',
        description: 'dimensionField1Description',
        type: sut.FieldType.TEXT,
        concept: sut.ConceptType.DIMENSION,
      },
      {
        id: 'dimensionField2Id',
        name: 'dimensionField2Name',
        description: 'dimensionField2Description',
        type: sut.FieldType.BOOLEAN,
        concept: sut.ConceptType.DIMENSION,
      },
    ],
    metrics: [
      {
        id: 'metricField1Id',
        name: 'metricField1Name',
        description: 'metricField1Description',
        type: sut.FieldType.NUMBER,
        concept: sut.ConceptType.METRIC,
      },
      {
        id: 'metricField2Id',
        name: 'metricField2Name',
        description: 'metricField2Description',
        type: sut.FieldType.PERCENT,
        concept: sut.ConceptType.METRIC,
      },
    ],
  };
  const expected: sut.TableFormat = {
    interactions: interactionsById,
    theme,
    dateRanges: {},
    fields: expectedFields,
    tables: {
      [sut.TableType.DEFAULT]: {
        headers: [
          {
            ...expectedFields.dimensions[0],
            configId: 'dimensions',
          },
          {
            ...expectedFields.dimensions[1],
            configId: 'dimensions',
          },
          {
            ...expectedFields.metrics[0],
            configId: 'metrics',
          },
          {
            ...expectedFields.metrics[1],
            configId: 'metrics',
          },
        ],
        rows: [
          ['1', false, 1, 0.01],
          ['2', true, 2, 0.02],
        ],
      },
      [sut.TableType.COMPARISON]: {
        headers: [
          {
            ...expectedFields.dimensions[0],
            configId: 'dimensions',
          },
          {
            ...expectedFields.dimensions[1],
            configId: 'dimensions',
          },
          {
            ...expectedFields.metrics[0],
            configId: 'metrics',
          },
          {
            ...expectedFields.metrics[1],
            configId: 'metrics',
          },
        ],
        rows: [
          ['1', false, 1, 0.01],
          ['2', true, 2, 0.02],
        ],
      },
    },
    style: {
      styleInnerId1: {
        defaultValue: '13',
        value: '12',
      },
      styleInnerId2: {
        defaultValue: '3',
        value: '4',
      },
    },
  };
  const actual: sut.TableFormat = sut.tableTransform(testMessage(2, 2, 2, 0));
  expect(actual).toEqual(expected);
});

test('objectTransform works', () => {
  const expected: sut.ObjectFormat = {
    interactions: interactionsById,
    dateRanges: {},
    fields: {
      dimensions: [
        {
          id: 'dimensionField1Id',
          name: 'dimensionField1Name',
          description: 'dimensionField1Description',
          type: sut.FieldType.TEXT,
          concept: sut.ConceptType.DIMENSION,
        },
        {
          id: 'dimensionField2Id',
          name: 'dimensionField2Name',
          description: 'dimensionField2Description',
          type: sut.FieldType.BOOLEAN,
          concept: sut.ConceptType.DIMENSION,
        },
      ],
      metrics: [
        {
          id: 'metricField1Id',
          name: 'metricField1Name',
          description: 'metricField1Description',
          type: sut.FieldType.NUMBER,
          concept: sut.ConceptType.METRIC,
        },
        {
          id: 'metricField2Id',
          name: 'metricField2Name',
          description: 'metricField2Description',
          type: sut.FieldType.PERCENT,
          concept: sut.ConceptType.METRIC,
        },
      ],
    },
    tables: {
      [sut.TableType.DEFAULT]: [
        {
          dimensions: ['1', false],
          metrics: [1, 0.01],
        },
        {
          dimensions: ['2', true],
          metrics: [2, 0.02],
        },
      ],
      [sut.TableType.COMPARISON]: [
        {
          dimensions: ['1', false],
          metrics: [1, 0.01],
        },
        {
          dimensions: ['2', true],
          metrics: [2, 0.02],
        },
      ],
    },
    style: {
      styleInnerId1: {
        defaultValue: '13',
        value: '12',
      },
      styleInnerId2: {
        defaultValue: '3',
        value: '4',
      },
    },
    theme,
  };
  const actual: sut.ObjectFormat = sut.objectTransform(testMessage(2, 2, 2, 0));
  expect(actual).toEqual(expected);
});

test('identity transform logs warning', () => {
  const message = testMessage(1, 1, 1, 2);
  const mockWarn = jest.fn((warn) => {
    throw new Error(warn);
  });
  global.console.warn = mockWarn;

  expect(() => {
    sut.subscribeToData(
      (actual) => {
        expect(actual).toEqual(sut.tableTransform(message));
      },
      {transform: (thing) => thing}
    );
  }).toThrow();
  expect(mockWarn.mock.calls[0][0]).toMatch(
    'This is an unsupported data format.'
  );
});

test('custom transform not supported', () => {
  const message = testMessage(1, 1, 1, 2);
  const addEventListenerMock = jest.fn((event, cb) => {
    if (event === 'message') {
      cb({data: message});
    } else {
      throw new Error('unsupported event type for testing');
    }
  });

  const postMessageMock = jest.fn();
  const removeEventListenerMock = jest.fn();

  window.addEventListener = addEventListenerMock;
  window.parent.postMessage = postMessageMock;
  window.removeEventListener = removeEventListenerMock;

  expect(() => {
    sut.subscribeToData(
      (actual) => {
        expect(actual).toEqual(sut.tableTransform(message));
      },
      {transform: (thing) => 245}
    );
  }).toThrowError('Only the built in transform functions are supported.');
});

test('Error thrown when styleIds are not unique', () => {
  const styleWithReusedIds: sut.ConfigStyle[] = [
    {
      id: 'styleId',
      label: 'styleLabel',
      elements: [
        {
          id: 'styleInnerId1',
          type: sut.ConfigStyleElementType.FILL_COLOR,
          label: 'This is a fill color label',
          defaultValue: '13',
          value: '12',
        },
      ],
    },
    {
      id: 'styleId',
      label: 'styleLabel2',
      elements: [
        {
          id: 'styleInnerId1',
          type: sut.ConfigStyleElementType.FILL_COLOR,
          label: 'This is a fill color label',
          defaultValue: '13',
          value: '12',
        },
      ],
    },
  ];

  const message: sut.Message = testMessage(1, 1, 1, 2);
  message.config.style = styleWithReusedIds;
  expect(() => {
    sut.objectTransform(message);
  }).toThrowError('styleInnerId1');
});

test('If there is no date range in the input, it returns the correct value', () => {
  const actual: sut.ObjectFormat = sut.objectTransform(testMessage(2, 2, 2, 0));
  expect(actual.dateRanges).toEqual({});
});

test('If there is one date range in the input, it returns the correct value', () => {
  const expectedDateRanges = {
    [sut.DateRangeType.DEFAULT]: {
      end: '20210130',
      start: '20200130',
    },
  };
  const actual: sut.ObjectFormat = sut.objectTransform(testMessage(2, 2, 2, 1));
  expect(actual.dateRanges).toEqual(expectedDateRanges);
});

test('If there is both date ranges in the input, it returns the correct value', () => {
  const expectedDateRanges = {
    [sut.DateRangeType.DEFAULT]: {
      end: '20210130',
      start: '20200130',
    },
    [sut.DateRangeType.COMPARISON]: {
      end: '20200130',
      start: '20190130',
    },
  };
  const actual: sut.ObjectFormat = sut.objectTransform(testMessage(2, 2, 2, 2));
  expect(actual.dateRanges).toEqual(expectedDateRanges);
});

test('If elements are dim met dim dim, they have to be sorted specially.', () => {
  const messageDimMetDimDim: sut.Message = {
    type: sut.MessageType.RENDER,
    config: {
      interactions: dsInteractions,
      themeStyle: theme,
      style: [],
      data: [
        {
          id: 'concepts',
          elements: [
            {
              id: 'max_results',
              label: 'Max Results',
              type: sut.ConfigDataElementType.MAX_RESULTS,
              options: {
                max: 3,
              },
            },
            {
              id: 'index',
              label: 'Index Dimension',
              type: sut.ConfigDataElementType.DIMENSION,
              options: {max: 1, min: 1},
              value: ['qt_6k2n466ktb'],
            },
            {
              id: 'arbitraryMetric',
              label: 'Aribrary Metric',
              type: sut.ConfigDataElementType.METRIC,
              options: {max: 1, min: 1},
              value: ['qt_t43n466ktb'],
            },
            {
              id: 'dateDimension',
              label: 'Date',
              type: sut.ConfigDataElementType.DIMENSION,
              options: {max: 1, min: 1, supportedTypes: ['TIME']},
              value: ['qt_s43n466ktb'],
            },
            {
              id: 'label',
              label: 'Timeline Labels',
              type: sut.ConfigDataElementType.DIMENSION,
              options: {max: 1, min: 1},
              value: ['qt_zc3n466ktb'],
            },
          ],
          label: 'Concepts',
        },
      ],
    },
    fields: [
      {
        id: 'qt_6k2n466ktb',
        name: 'Source',
        type: sut.FieldType.TEXT,
        concept: sut.ConceptType.DIMENSION,
      },
      {
        id: 'qt_s43n466ktb',
        name: 'Date',
        type: sut.FieldType.YEAR_MONTH_DAY,
        concept: sut.ConceptType.DIMENSION,
      },
      {
        id: 'qt_zc3n466ktb',
        name: 'Medium',
        type: sut.FieldType.TEXT,
        concept: sut.ConceptType.DIMENSION,
      },
      {
        id: 'qt_t43n466ktb',
        name: 'Sessions',
        type: sut.FieldType.NUMBER,
        concept: sut.ConceptType.METRIC,
      },
    ],
    dataResponse: {
      tables: [
        {
          id: sut.TableType.DEFAULT,
          fields: [
            'qt_6k2n466ktb',
            'qt_s43n466ktb',
            'qt_zc3n466ktb',
            'qt_t43n466ktb',
          ],
          rows: [
            ['google', '20181126', 'organic', 2105],
            ['google', '20181205', 'organic', 1775],
            ['google', '20181206', 'organic', 1764],
          ],
        },
      ],
    },
  };
  const actual: sut.TableFormat = sut.tableTransform(messageDimMetDimDim);

  const headers = actual.tables[sut.TableType.DEFAULT].headers;
  expect(headers[0].configId === 'index');
  expect(headers[0].configId === 'dateDimension');
  expect(headers[0].configId === 'label');
  expect(headers[0].configId === 'arbitraryMetric');

  const rows = actual.tables[sut.TableType.DEFAULT].rows;
  expect(rows[0][0]).toEqual('google');
  expect(rows[0][3]).toEqual(2105);
});

describe('when window.location mocked', () => {
  test('finds componentId when defined', () => {
    window.history.replaceState({}, 'Test Title', '/test?dscId=my-id');
    expect(sut.getComponentId()).toEqual('my-id');
  });

  test('throws with componentId is not defined', () => {
    window.history.replaceState({}, 'Test Title', '/test?id=1');
    expect(() => sut.getComponentId()).toThrow(
      'dscId must be in the query parameters'
    );
  });
});
