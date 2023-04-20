export const DEFAULT_NAME = '模拟数据生成器';

/**
 * 字段类型列表
 */
export const FIELD_TYPE_LIST = [
    'TINYINT',
    'SMALLINT',
    'MEDIUMINT',
    'INT',
    'BIGINT',
    'FLOAT',
    'DOUBLE',
    'DECIMAL',
    'DATE',
    'TIME',
    'YEAR',
    'DATETIME',
    'TIMESTAMP',
    'CHAR',
    'VARCHAR',
    'TINYTEXT',
    'TEXT',
    'MEDIUMTEXT',
    'LONGTEXT',
    'TINYBLOB',
    'BLOB',
    'MEDIUMBLOB',
    'LONGBLOB',
    'BINARY',
    'VARBINARY',
    'BIT',
    'ENUM',
    'SET'
];

// export const FIELD_TYPE_LIST = [
//   'tinyint',
//   'smallint',
//   'mediumint',
//   'int',
//   'bigint',
//   'float',
//   'double',
//   'decimal',
//   'date',
//   'time',
//   'year',
//   'datetime',
//   'timestamp',
//   'char',
//   'varchar',
//   'tinytext',
//   'text',
//   'mediumtext',
//   'longtext',
//   'tinyblob',
//   'blob',
//   'mediumblob',
//   'longblob',
//   'binary',
//   'varbinary',
// ];

/**
 * onUpdate 值列表
 */
export const ON_UPDATE_LIST = ['CURRENT_TIMESTAMP'];

/**
 * 默认添加的字段信息
 */
export const DEFAULT_ADD_FIELD: Field = {
    fieldName: '',
    comment: '',
    defaultValue: undefined,
    fieldType: '',
    mockType: '',
    mockParams: '',
    notNull: false,
    primaryKey: false,
    autoIncrement: false,
};

/**
 * 通用字段列表
 */
export const COMMON_FIELD_LIST: Field[] = [
    {
        fieldName: 'id',
        comment: '主键',
        defaultValue: undefined,
        fieldType: 'bigint',
        mockType: '不模拟',
        notNull: true,
        primaryKey: true,
        autoIncrement: true,
    },
    {
        fieldName: 'username',
        comment: '用户名',
        defaultValue: undefined,
        fieldType: 'varchar(256)',
        mockType: '随机',
        mockParams: '人名',
        notNull: true,
        primaryKey: false,
        autoIncrement: false,
    },
    {
        fieldName: 'create_time',
        comment: '创建时间',
        defaultValue: 'CURRENT_TIMESTAMP',
        fieldType: 'datetime',
        mockType: '不模拟',
        notNull: true,
        primaryKey: false,
        autoIncrement: false,
    },
    {
        fieldName: 'update_time',
        comment: '更新时间',
        defaultValue: 'CURRENT_TIMESTAMP',
        fieldType: 'datetime',
        mockType: '不模拟',
        notNull: true,
        primaryKey: false,
        autoIncrement: false,
        onUpdate: 'CURRENT_TIMESTAMP',
    },
    {
        fieldName: 'is_deleted',
        comment: '是否删除(0-未删, 1-已删)',
        defaultValue: '0',
        fieldType: 'tinyint',
        mockType: '不模拟',
        notNull: true,
        primaryKey: false,
        autoIncrement: false,
    },
];

/**
 * 模拟类型列表
 */
export const MOCK_TYPE_LIST = ['固定', '随机', '递增', '规则', '词库', '不模拟'];

/**
 * 模拟参数随机生成类型列表
 */
export const MOCK_PARAMS_RANDOM_TYPE_LIST = [
    '字符串',
    '整数',
    '小数',
    '日期',
    '时间戳',
    '网址',
    'IP',
    '邮箱',
    '手机号',
    '人名',
    '城市',
    '大学',
];


