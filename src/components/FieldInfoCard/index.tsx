import FieldInfoList from '@/components/FieldInfoList';
import {listFieldInfoByPage} from '@/services/fieldInfoService';
import {Link, useModel} from '@umijs/max';
import {Button, Card, Empty, Input, message, Space} from 'antd';
import React, {useEffect, useState} from 'react';
import './index.less';

// 默认分页大小
const DEFAULT_PAGE_SIZE = 10;

interface Props {
    title?: string;
    needLogin?: boolean;
    showTag?: boolean;
    onLoad?: (
        searchParams: FieldInfoType.FieldInfoQueryRequest,
        setDataList: (dataList: FieldInfoType.FieldInfo[]) => void,
        setTotal: (total: number) => void,
    ) => void;
    onImport?: (values: FieldInfoType.FieldInfo) => void;
    hideCreateButton?: boolean; // 新增hideCreateButton属性
}

/**
 * 表信息卡片
 *
 * @constructor
 */

const FieldInfoCard: React.FC<Props> = ({
                                            title = '字段信息列表',
                                            needLogin = false,
                                            showTag = true,
                                            onLoad,
                                            onImport,
                                            hideCreateButton = false, // 默认显示“创建表”按钮
                                        }) => {
    // 公开数据
    const [dataList, setDataList] = useState<FieldInfoType.FieldInfo[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const initSearchParams: FieldInfoType.FieldInfoQueryRequest = {
        current: 1,
        pageSize: DEFAULT_PAGE_SIZE,
        sortField: 'createTime',
        sortOrder: 'descend',
    };
    const [searchParams, setSearchParams] =
        useState<FieldInfoType.FieldInfoQueryRequest>(initSearchParams);

    const {initialState} = useModel('@@initialState');
    const loginUser = initialState?.loginUser;

    /**
     * 加载数据
     */
    const innerOnLoad = () => {
        listFieldInfoByPage({
            ...searchParams,
            // 只展示已审核通过的
            reviewStatus: 1,
        })
            .then((res) => {
                setDataList(res.data.records);
                setTotal(res.data.total);
            })
            .catch((e) => {
                message.error('加载失败，' + e.message);
            });
    };

    // 加载数据
    useEffect(() => {
        // 需要登录
        if (needLogin && !loginUser) {
            return;
        }
        setLoading(true);
        if (onLoad) {
            onLoad(searchParams, setDataList, setTotal);
        } else {
            innerOnLoad();
        }
        setLoading(false);
    }, [searchParams]);

    const renderExtraButtons = () => {
        if (hideCreateButton) {
            return null; // 如果 hideCreateButton 为 true，则不渲染该按钮
        }

        return (
            <Link to="/">
                <Button type="primary">去创建</Button>
            </Link>
        );
    };

    return (
        <div className="field-info-card">
            <Card
                title={title}
                extra={
                    renderExtraButtons()
                }
            >
                {!needLogin || loginUser ? (
                    <>
                        <Space>
                            <Input.Search
                                placeholder="请输入名称"
                                enterButton="搜索"
                                onSearch={(value) => {
                                    setSearchParams({
                                        ...initSearchParams,
                                        searchName: value,
                                    });
                                }}
                            />
                        </Space>
                        <FieldInfoList
                            pagination={{
                                total,
                                onChange: (current) => {
                                    setSearchParams({...searchParams, current});
                                    window.scrollTo({
                                        top: 0,
                                    });
                                },
                                pageSize: DEFAULT_PAGE_SIZE,
                            }}
                            dataList={dataList}
                            loading={loading}
                            showTag={showTag}
                            onImport={onImport}
                        />
                    </>
                ) : (
                    <Empty
                        description={
                            <Link to="/user/login">
                                <Button type="primary" ghost style={{marginTop: 8}}>
                                    请先登录
                                </Button>
                            </Link>
                        }
                    />
                )}
            </Card>
        </div>
    );
};

export default FieldInfoCard;
