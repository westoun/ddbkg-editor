const VALUE_TYPE_LITERAL = 'VALUE_TYPE_LITERAL';
const VALUE_TYPE_URI = 'VALUE_TYPE_URI';

const FIELD_TYPE_TEXT = 'FIELD_TYPE_TEXT';
const FIELD_TYPE_COMBO = 'FIELD_TYPE_COMBO';
const FIELD_TYPE_LIST = 'FIELD_TYPE_LIST';
const FIELD_TYPE_LINK = 'FIELD_TYPE_LINK';
const FIELD_TYPE_DATE = 'FIELD_TYPE_DATE';

const PROPERTY_BEHAVIOR_LOOKUP: any = {
  'http://purl.org/dc/elements/1.1/title': {
    editable: true,
    valueType: VALUE_TYPE_LITERAL,
    fieldType: FIELD_TYPE_TEXT,
  },
  'http://purl.org/dc/terms/alternative': {
    editable: true,
    valueType: VALUE_TYPE_LITERAL,
    fieldType: FIELD_TYPE_TEXT,
  },
  'http://purl.org/dc/terms/isPartOf': {
    editable: false,
    valueType: VALUE_TYPE_URI,
    fieldType: FIELD_TYPE_LINK,
  },
  'ddb:hierarchyPosition': {
    editable: false,
    valueType: VALUE_TYPE_LITERAL,
    fieldType: FIELD_TYPE_TEXT,
  },
  'http://purl.org/dc/terms/issued': {
    editable: true,
    valueType: VALUE_TYPE_LITERAL,
    fieldType: FIELD_TYPE_DATE,
  },
  'http://purl.org/dc/terms/created': {
    editable: false,
    valueType: VALUE_TYPE_LITERAL,
    fieldType: FIELD_TYPE_DATE,
  },
  'http://purl.org/dc/elements/1.1/creator': {
    editable: true,
    valueType: VALUE_TYPE_LITERAL,
    fieldType: FIELD_TYPE_LIST,
  },
  'http://purl.org/dc/elements/1.1/contributor': {
    editable: true,
    valueType: VALUE_TYPE_LITERAL,
    fieldType: FIELD_TYPE_TEXT,
  },
  'http://purl.org/dc/elements/1.1/publisher': {
    editable: true,
    valueType: VALUE_TYPE_LITERAL,
    fieldType: FIELD_TYPE_TEXT,
  },
  'http://purl.org/dc/elements/1.1/subject': {
    editable: true,
    valueType: VALUE_TYPE_LITERAL,
    fieldType: FIELD_TYPE_TEXT,
  },
  'http://purl.org/dc/terms/subject': {
    editable: true,
    valueType: VALUE_TYPE_LITERAL,
    fieldType: FIELD_TYPE_TEXT,
  },
  'http://www.europeana.eu/schemas/edm/type': {
    editable: false,
    valueType: VALUE_TYPE_URI,
    fieldType: FIELD_TYPE_LINK,
  },
  'http://www.europeana.eu/schemas/edm/hasType': {
    editable: true,
    valueType: VALUE_TYPE_URI,
    fieldType: FIELD_TYPE_LINK,
  },
  'http://purl.org/dc/elements/1.1/type': {
    editable: false,
    valueType: VALUE_TYPE_LITERAL,
    fieldType: FIELD_TYPE_LIST,
  },
  'http://purl.org/dc/terms/language': {
    editable: true,
    valueType: VALUE_TYPE_URI,
    fieldType: FIELD_TYPE_LIST,
  },
  'http://purl.org/dc/elements/1.1/language': {
    editable: false,
    valueType: VALUE_TYPE_LITERAL,
    fieldType: FIELD_TYPE_TEXT,
  },
  'http://www.europeana.eu/schemas/edm/hasMet': {
    editable: false,
    valueType: VALUE_TYPE_URI,
    fieldType: FIELD_TYPE_LINK,
  },
  'http://purl.org/dc/elements/1.1/identifier': {
    editable: true,
    valueType: VALUE_TYPE_LITERAL,
    fieldType: FIELD_TYPE_TEXT,
  },
  'http://purl.org/dc/elements/1.1/description': {
    editable: true,
    valueType: VALUE_TYPE_LITERAL,
    fieldType: FIELD_TYPE_TEXT,
  },
  'http://purl.org/dc/terms/extent': {
    editable: true,
    valueType: VALUE_TYPE_LITERAL,
    fieldType: FIELD_TYPE_TEXT,
  },
  'http://purl.org/dc/elements/1.1/relation': {
    editable: true,
    valueType: VALUE_TYPE_URI,
    fieldType: FIELD_TYPE_LINK,
  },
  'http://purl.org/dc/elements/1.1/source': {
    editable: true,
    valueType: VALUE_TYPE_URI,
    fieldType: FIELD_TYPE_LINK,
  },
};

export default PROPERTY_BEHAVIOR_LOOKUP;
