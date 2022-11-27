import {PageContainer} from '@ant-design/pro-components';
import React, {useEffect, useState} from 'react';
import {Button, Card, Descriptions, Form, message} from "antd";
import {
  getInterfaceInfoByIdUsingGET, invokeInterfaceInfoUsingPOST,
} from "@/services/winterapi-backend/interfaceInfoController";
import {useParams} from "@@/exports";
import Input from 'antd/es/input';

const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<API.InterfaceInfo>();
  const [invokeLoading, setInvokeLoading] = useState(false);
  const [invokeResult, setInvokeResult] = useState<any>();
  const params = useParams();

  /**
   * 加载数据
   */
  const loadData = async () => {
    if (!params.id) {
      message.error('接口不存在');
      return;
    }
    setLoading(true);
    try {
      const res = await getInterfaceInfoByIdUsingGET({
        id: Number(params.id),
      });
      setData(res?.data);
    } catch (error: any) {
      message.error('接口信息加载失败：' + error.message);
    }
    setLoading(false);
  };

  /**
   * 初始化数据
   */
  useEffect(() => {
    loadData();
  }, [])

  const onFinish = async (values: any) => {
    if (!params.id) {
      message.error('接口不存在');
      return;
    }
    setInvokeLoading(true);
    try {
      const res = await invokeInterfaceInfoUsingPOST({
        id: Number(params.id),
        ...values,
      });
      setInvokeResult(res?.data);
    } catch (error: any) {
      message.error('接口测试调用失败：' + error.message);
    }
    setInvokeLoading(false);
  };

  return (
    <PageContainer title="接口文档">
      <Card loading={loading}>
        {
          data ? (
              <Descriptions title={data.name} column={1}>
                <Descriptions.Item label="状态">{data.status === 0 ? '下线' : '正常'}</Descriptions.Item>
                <Descriptions.Item label="描述">{data.description}</Descriptions.Item>
                <Descriptions.Item label="URL">{data.url}</Descriptions.Item>
                <Descriptions.Item label="请求方式">{data.method}</Descriptions.Item>
                <Descriptions.Item label="请求参数">{data.requestParams}</Descriptions.Item>
                <Descriptions.Item label="请求头">{data.requestHeader}</Descriptions.Item>
                <Descriptions.Item label="响应头">{data.responseHeader}</Descriptions.Item>
                <Descriptions.Item label="创建时间">
                  {data.createTime}
                </Descriptions.Item>
                <Descriptions.Item label="更新时间">
                  {data.updateTime}
                </Descriptions.Item>
              </Descriptions>)
            : (
              <>接口不存在</>
            )}
      </Card>
      <Card title="【在线测试】" loading={invokeLoading}>
        <Form
          name="invoke"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            label="请求参数"
            name="userRequestParams"
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              调用
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {
        invokeResult ? (
          <Card title="【返回结果】">
            {invokeResult}
          </Card>
        ) : ""
      }

    </PageContainer>
  );
};

export default Index;
