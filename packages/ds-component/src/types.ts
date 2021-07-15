/*!
  @license
  Copyright 2019 Google LLC

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

  https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
import {clearInteraction} from '.';

export interface PostMessage extends MessageEvent {
  data: Message;
}

export interface Message {
  /**
   * The message type.
   */
  type: MessageType;
  /**
   * The configuration state of the component.
   */
  config: Config;
  /**
   * A list of all user selected fields.
   */
  fields: Field[];
  /**
   * The data corresponding to the data config state of the component.
   */
  dataResponse: DataResponse;
}

export interface Config {
  /**
   * The data config defined for the component.
   */
  data: ConfigData[];
  colorMap: ColorMap[];
  /**
   * The style elements required and supported by the component.
   */
  style: ConfigStyle[];
  themeStyle?: ConfigThemeStyle;
  interactions: DSInteractionData[];
}

export interface Field {
  /**
   * The ID of the field.
   */
  id: FieldId;
  /**
   * The user-friendly name of the field.
   */
  name: string;
  /**
   * The user-friendly description of the field.
   */
  description?: string;
  /**
   * The field type.
   */
  type: FieldType;
  /**
   * The field concept.
   */
  concept: ConceptType;
}

export enum ConceptType {
  METRIC = 'METRIC',
  DIMENSION = 'DIMENSION',
}

export interface ColorInfo {
  id: string;
  color: string;
}

export interface ColorMap {
 colors: ColorInfo[];
}

export interface DSDateRange {
  id: DateRangeType;
  start: string;
  end: string;
}

export interface DataResponse {
  /**
   * The list of tables for the current data configuration.
   */
  tables: Table[];
  dateRanges?: DSDateRange[];
}

export enum MessageType {
  RENDER = 'RENDER',
}

export interface ConfigData {
  /**
   * The ID of the data section.
   *
   * This should be a non-empty string with no spaces.
   */
  id: ConfigDataId;
  /**
   * The label for the data section.
   */
  label: string;
  /**
   * The data elements to render.
   */
  elements: ConfigDataElement[];
}
export interface ConfigStyle {
  /**
   * The ID of the style section.
   */
  id: ConfigStyleId;
  /**
   * The heading for the style section.
   */
  label: string;
  /**
   * The style elements to render.
   */
  elements: ConfigStyleElement[];
}

export interface ConfigThemeStyle {
  themeFillColor: {
    color: string;
    opacity?: number;
    themeRef?: ThemeRefIndex;
  };
  themeFontColor: {
    color: string;
    opacity?: number;
    themeRef?: ThemeRefIndex;
  };
  themeAccentFillColor: {
    color: string;
    opacity?: number;
    themeRef?: ThemeRefIndex;
  };
  themeAccentFontColor: {
    color: string;
    opacity?: number;
    themeRef?: ThemeRefIndex;
  };
  themeFontFamily: string;
  themeAccentFontFamily: string;
  themeIncreaseColor: {
    color: string;
    opacity?: number;
  };
  themeDecreaseColor: {
    color: string;
    opacity?: number;
  };
  themeGridColor: {
    color: string;
    opacity?: number;
  };
  themeSeriesColor: Array<{
    color: string;
    opacity?: number;
    themeRef?: ThemeRefIndex;
    seriesRef: SeriesRefIndex;
  }>;
}

interface ThemeRefIndex {
  index: number;
}
interface SeriesRefIndex {
  index: number;
}

export interface ThemeStyle {
  themeFillColor: {
    color: string;
    opacity?: number;
    themeRef?: ThemeRefIndex;
  };
  themeFontColor: {
    color: string;
    opacity?: number;
    themeRef?: ThemeRefIndex;
  };
  themeAccentFillColor: {
    color: string;
    opacity?: number;
    themeRef?: ThemeRefIndex;
  };
  themeAccentFontColor: {
    color: string;
    opacity?: number;
    themeRef?: ThemeRefIndex;
  };
  themeFontFamily: string;
  themeAccentFontFamily: string;
  themeIncreaseColor: {
    color: string;
    opacity?: number;
  };
  themeDecreaseColor: {
    color: string;
    opacity?: number;
  };
  themeGridColor: {
    color: string;
    opacity?: number;
  };
  themeSeriesColor: Array<{
    color: string;
    opacity?: number;
    themeRef?: ThemeRefIndex;
    seriesRef: SeriesRefIndex;
  }>;
}

export enum FieldType {
  YEAR = 'YEAR',
  YEAR_QUARTER = 'YEAR_QUARTER',
  YEAR_MONTH = 'YEAR_MONTH',
  YEAR_WEEK = 'YEAR_WEEK',
  YEAR_MONTH_DAY = 'YEAR_MONTH_DAY',
  YEAR_MONTH_DAY_HOUR = 'YEAR_MONTH_DAY_HOUR',
  QUARTER = 'QUARTER',
  MONTH = 'MONTH',
  WEEK = 'WEEK',
  MONTH_DAY = 'MONTH_DAY',
  DAY_OF_WEEK = 'DAY_OF_WEEK',
  DAY = 'DAY',
  HOUR = 'HOUR',
  MINUTE = 'MINUTE',
  DURATION = 'DURATION',
  COUNTRY = 'COUNTRY',
  COUNTRY_CODE = 'COUNTRY_CODE',
  CONTINENT = 'CONTINENT',
  CONTINENT_CODE = 'CONTINENT_CODE',
  SUB_CONTINENT = 'SUB_CONTINENT',
  SUB_CONTINENT_CODE = 'SUB_CONTINENT_CODE',
  REGION = 'REGION',
  REGION_CODE = 'REGION_CODE',
  CITY = 'CITY',
  CITY_CODE = 'CITY_CODE',
  METRO_CODE = 'METRO_CODE',
  LATITUDE_LONGITUDE = 'LATITUDE_LONGITUDE',
  NUMBER = 'NUMBER',
  PERCENT = 'PERCENT',
  TEXT = 'TEXT',
  BOOLEAN = 'BOOLEAN',
  URL = 'URL',
  IMAGE = 'IMAGE',
  CURRENCY_AED = 'CURRENCY_AED',
  CURRENCY_ALL = 'CURRENCY_ALL',
  CURRENCY_ARS = 'CURRENCY_ARS',
  CURRENCY_AUD = 'CURRENCY_AUD',
  CURRENCY_BDT = 'CURRENCY_BDT',
  CURRENCY_BGN = 'CURRENCY_BGN',
  CURRENCY_BOB = 'CURRENCY_BOB',
  CURRENCY_BRL = 'CURRENCY_BRL',
  CURRENCY_CAD = 'CURRENCY_CAD',
  CURRENCY_CDF = 'CURRENCY_CDF',
  CURRENCY_CHF = 'CURRENCY_CHF',
  CURRENCY_CLP = 'CURRENCY_CLP',
  CURRENCY_CNY = 'CURRENCY_CNY',
  CURRENCY_COP = 'CURRENCY_COP',
  CURRENCY_CRC = 'CURRENCY_CRC',
  CURRENCY_CZK = 'CURRENCY_CZK',
  CURRENCY_DKK = 'CURRENCY_DKK',
  CURRENCY_DOP = 'CURRENCY_DOP',
  CURRENCY_EGP = 'CURRENCY_EGP',
  CURRENCY_ETB = 'CURRENCY_ETB',
  CURRENCY_EUR = 'CURRENCY_EUR',
  CURRENCY_GBP = 'CURRENCY_GBP',
  CURRENCY_HKD = 'CURRENCY_HKD',
  CURRENCY_HRK = 'CURRENCY_HRK',
  CURRENCY_HUF = 'CURRENCY_HUF',
  CURRENCY_IDR = 'CURRENCY_IDR',
  CURRENCY_ILS = 'CURRENCY_ILS',
  CURRENCY_INR = 'CURRENCY_INR',
  CURRENCY_IRR = 'CURRENCY_IRR',
  CURRENCY_ISK = 'CURRENCY_ISK',
  CURRENCY_JMD = 'CURRENCY_JMD',
  CURRENCY_JPY = 'CURRENCY_JPY',
  CURRENCY_KRW = 'CURRENCY_KRW',
  CURRENCY_LKR = 'CURRENCY_LKR',
  CURRENCY_LTL = 'CURRENCY_LTL',
  CURRENCY_MNT = 'CURRENCY_MNT',
  CURRENCY_MVR = 'CURRENCY_MVR',
  CURRENCY_MXN = 'CURRENCY_MXN',
  CURRENCY_MYR = 'CURRENCY_MYR',
  CURRENCY_NOK = 'CURRENCY_NOK',
  CURRENCY_NZD = 'CURRENCY_NZD',
  CURRENCY_PAB = 'CURRENCY_PAB',
  CURRENCY_PEN = 'CURRENCY_PEN',
  CURRENCY_PHP = 'CURRENCY_PHP',
  CURRENCY_PKR = 'CURRENCY_PKR',
  CURRENCY_PLN = 'CURRENCY_PLN',
  CURRENCY_RON = 'CURRENCY_RON',
  CURRENCY_RSD = 'CURRENCY_RSD',
  CURRENCY_RUB = 'CURRENCY_RUB',
  CURRENCY_SAR = 'CURRENCY_SAR',
  CURRENCY_SEK = 'CURRENCY_SEK',
  CURRENCY_SGD = 'CURRENCY_SGD',
  CURRENCY_THB = 'CURRENCY_THB',
  CURRENCY_TRY = 'CURRENCY_TRY',
  CURRENCY_TWD = 'CURRENCY_TWD',
  CURRENCY_TZS = 'CURRENCY_TZS',
  CURRENCY_UAH = 'CURRENCY_UAH',
  CURRENCY_USD = 'CURRENCY_USD',
  CURRENCY_UYU = 'CURRENCY_UYU',
  CURRENCY_VEF = 'CURRENCY_VEF',
  CURRENCY_VND = 'CURRENCY_VND',
  CURRENCY_YER = 'CURRENCY_YER',
  CURRENCY_ZAR = 'CURRENCY_ZAR',
}

export interface Table {
  /**
   * The type of the table.
   */
  id: TableType;
  /**
   * The [[FieldId]]s of the fields selected by the user.
   */
  fields: FieldId[];
  /**
   * The rows of data Values.
   */
  rows: DSRow[];
}

/**
 * A row of values.
 *
 * The order of values corresponds to the order of the fields of all data element field objects.
 */

export type DSRow = DSRowValue[];
/**
 * A value for an entry in a DSRow.
 */
export type DSRowValue = string | number | boolean;

export interface ConfigDataElementMetric {
  /**
   * The data element type to render.
   */
  type: ConfigDataElementType.METRIC;
  /**
   * The ID of the metric.
   *
   * This should be a non-empty string with no spaces.
   */
  id: ConfigDataElementId;
  /**
   * The tooltip or label for the metric.
   */
  label: string;
  /**
   * The data options for a Metric.
   */
  options: {
    /**
     * The minimum number of metrics supported.
     */
    min?: number;
    /**
     * The maximum number of metrics supported.
     */
    max?: number;
  };
  /**
   * The list of [[FieldId]]s selected by the user.
   */
  value: FieldId[];
}

export interface ConfigDataElementDimension {
  /**
   * The data element type to render.
   */
  type: ConfigDataElementType.DIMENSION;
  /**
   * The ID of the dimension.
   *
   * This should be a non-empty string with no spaces.
   */
  id: ConfigDataElementId;
  /**
   * The tooltip or label for the dimension.
   */
  label: string;
  /**
   * The data options for a Dimension.
   */
  options: {
    /**
     * The minimum number of dimensions supported.
     */
    min?: number;
    /**
     * The maximum number of dimensions supported.
     */
    max?: number;
    supportedTypes?: Array<'TIME' | 'GEO' | 'DEFAULT'>;
  };
  /**
   * The list of [[FieldId]]s selected by the user.
   */
  value: FieldId[];
}

export interface ConfigDataElementMaxResults {
  /**
   * The data element type to render.
   */
  type: ConfigDataElementType.MAX_RESULTS;
  /**
   * The ID of the max results.
   *
   * This should be a non-empty string with no spaces.
   */
  id: ConfigDataElementId;
  /**
   * The tooltip or label for the max results.
   */
  label: string;
  /**
   * The data options for a Max Results.
   */
  options: {
    /**
     * The maximum number of rows.
     */
    max: number;
  };
}

export type ConfigDataElement =
  | ConfigDataElementMaxResults
  | ConfigDataElementMetric
  | ConfigDataElementDimension;

// TODO: this should eventually always be a value
export type ConfigStyleValue = string | {} | boolean | {color: string};

export interface ConfigStyleElement {
  /**
   * The style element type to render.
   */
  type: ConfigStyleElementType;
  /**
   * The ID of the style element.
   *
   * This should be a non-empty string with no spaces.
   */
  id: ConfigStyleElementId;
  /**
   * The tooltip or label for the style element.
   *
   * This is the label text for a `CHECKBOX` element and the tooltip text for other elements.
   */
  label: string;
  /**
   * The default value for the style element.
   *
   * Invalid values will be ignored.
   */
  defaultValue: ConfigStyleValue;
  /**
   * The current value of the style element.
   */
  value: ConfigStyleValue;
}
export enum TableType {
  DEFAULT = 'DEFAULT',
  COMPARISON = 'COMPARISON',
  SUMMARY = 'SUMMARY',
}

export enum DateRangeType {
  DEFAULT = 'DEFAULT',
  COMPARISON = 'COMPARISON',
}

export enum ConfigDataElementType {
  /**
   * Renders a metric field element.
   */
  METRIC = 'METRIC',
  /**
   * Renders a dimension field element.
   */
  DIMENSION = 'DIMENSION',
  /**
   * Renders a dropdown that affects the maximum number of results returned.
   */
  MAX_RESULTS = 'MAX_RESULTS',
}

export enum ConfigStyleElementType {
  /**
   * Renders a text input box.
   */
  TEXTINPUT = 'TEXTINPUT',
  /**
   * A single select dropdown.
   */
  SELECT_SINGLE = 'SELECT_SINGLE',
  /**
   * Renders a checkbox.
   *
   * Default value: `false`
   */
  CHECKBOX = 'CHECKBOX',
  /**
   * Renders the font color selector.
   *
   * Acceptable default values: HEX color value. E.g. `"#888888"`.
   *
   * Default value: `"#000"`.
   */
  FONT_COLOR = 'FONT_COLOR',
  /**
   * Renders the font size selector.
   *
   * Default value: `"14px"`.
   */
  FONT_SIZE = 'FONT_SIZE',
  /**
   * Renders the font family selector.
   *
   * Default value: `""`
   */
  FONT_FAMILY = 'FONT_FAMILY',
  /**
   * Renders a fill color selector.
   *
   * Acceptable default values: HEX color value.
   */
  FILL_COLOR = 'FILL_COLOR',
  /**
   * Renders a border color selector.
   *
   * Acceptable default values: HEX color value.
   */
  BORDER_COLOR = 'BORDER_COLOR',
  /**
   * Renders an axis color selector.
   *
   * Acceptable default values: HEX color value.
   */
  AXIS_COLOR = 'AXIS_COLOR',
  /**
   * Renders a grid color selector.
   *
   * Acceptable default values: HEX color value.
   */
  GRID_COLOR = 'GRID_COLOR',
  /**
   * Renders an opacity selector.
   */
  OPACITY = 'OPACITY',
  /**
   * Renders a line weight picker.
   */
  LINE_WEIGHT = 'LINE_WEIGHT',
  /**
   * Renders a line style picker.
   *
   * Acceptable default values: `"solid"`, `"dashed"`, `"dotted"`, or `"double"`.
   */
  LINE_STYLE = 'LINE_STYLE',
  /**
   * Renders a border radius selector.
   */
  BORDER_RADIUS = 'BORDER_RADIUS',
  /**
   * Renders an interval selector.
   */
  INTERVAL = 'INTERVAL',
  /**
   * Renders a radio select with pre-defined values.
   */
  SELECT_RADIO = 'SELECT_RADIO',
}

export type DSInteractionData = DSInteractionFilterData;

export interface DSInteractionFilterData {
  supportedActions: DSInteractionType[];
  id: InteractionId;
  value: DSInteractionFilterValue;
}

export enum DSInteractionType {
  FILTER = 'FILTER',
}

export interface DSInteractionFilterValue {
  type: DSInteractionType;
  data: InteractionData;
}

// Aliases
export type FieldId = string;
export type ConfigDataId = string;
export type ConfigStyleId = string;
export type ConfigDataElementId = string;
export type ConfigStyleElementId = string;

// Custom types for Library
export interface ParsedImage {
  originalUrl: string;
  proxiedUrl?: string;
  altText?: string;
}

export interface FieldsById {
  // An indexed Type cannot be a type alias :(
  [fieldId: string]: Field;
}

export type ParsedRow = ParsedRowValue[];

export interface RowByConfigId {
  [configId: string]: ParsedRow;
}

export interface TablesByType {
  [TableType.DEFAULT]: RowByConfigId[];
  [TableType.COMPARISON]: RowByConfigId[];
  [TableType.SUMMARY]: RowByConfigId[];
}

export type ParsedRowValue = string | number | boolean | ParsedImage;

export type RowHeading = Field & {configId: string};
export type RowEntry = string | number | boolean;
export type Row = RowEntry[];

export interface FieldsByConfigId {
  [configId: string]: Field[];
}

export type StyleTheme = any;
export type StyleEntry = any;
export type StyleValue = StyleTheme | StyleEntry;

export interface StyleById {
  [styleId: string]: StyleValue;
}

export interface TableData {
  headers: RowHeading[];
  rows: Row[];
}

export interface Tables {
  [TableType.DEFAULT]: TableData;
  [TableType.COMPARISON]?: TableData;
  [TableType.SUMMARY]?: TableData;
}

export interface TableFormat {
  fields: FieldsByConfigId;
  style: StyleById;
  tables: Tables;
  dateRanges: DateRangesById;
  theme: ThemeStyle;
  interactions: InteractionsById;
}

export type TableTransform = (message: Message) => TableFormat;

export type ConfigId = string;

export interface SubscriptionsOptions<T> {
  transform: (message: Message) => T;
}

export interface ObjectRow {
  [configId: string]: RowEntry[];
}

export interface ObjectTables {
  [TableType.DEFAULT]: ObjectRow[];
  [TableType.COMPARISON]?: ObjectRow[];
  [TableType.SUMMARY]?: ObjectRow[];
}

export interface DateRangesById {
  [DateRangeType.DEFAULT]?: {
    start: string;
    end: string;
  };
  [DateRangeType.COMPARISON]?: {
    start: string;
    end: string;
  };
}

export interface ObjectFormat {
  fields: FieldsByConfigId;
  style: StyleById;
  tables: ObjectTables;
  dateRanges: DateRangesById;
  theme: ThemeStyle;
  interactions: InteractionsById;
}

export type ComponentId = string;

export type ObjectTransform = (message: Message) => ObjectFormat;

export enum ToDSMessageType {
  VIZ_READY = 'vizReady',
  INTERACTION = 'vizAction',
}

export interface VizReadyMessage {
  type: ToDSMessageType.VIZ_READY;
  componentId: ComponentId;
}

// Interaction Types
export interface InteractionMessage {
  type: ToDSMessageType.INTERACTION;
  id: InteractionId;
  data: InteractionData;
  componentId: ComponentId;
}

export interface SendInteraction {
  // TODO - remove this once there is more than one interaction type.
  // tslint:disable-next-line callable-types
  (
    actionId: InteractionId,
    interaction: InteractionType.FILTER,
    data: FilterInteractionData
  ): void;
  // TODO - When there are more Interaction types, the new ones should be added here with their own signature.
}

export interface ClearInteraction {
  // tslint:disable-next-line callable-types
  (
    actionId: InteractionId,
    interaction: InteractionType.FILTER,
    data: undefined
  ): void;
}

export type ConceptId = string;
export type FilterParamValue = string | number | boolean;

export interface FilterInteractionData {
  concepts: ConceptId[];
  values: FilterParamValue[][];
}

export enum InteractionType {
  FILTER = 'FILTER',
}

export interface InteractionValue {
  type: InteractionType;
  data: InteractionData;
}

export type InteractionData = FilterInteractionData;

export type InteractionId = string;

export interface Interaction {
  supportedActions: InteractionType[];
  value: InteractionValue | {};
}

export interface InteractionsById {
  [interactionId: string]: Interaction;
}
