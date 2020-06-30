<template>
    <div class="animated fadeIn">
        <Row>
            <Form :label-width="80" :model="road">
                <Col span="12" >
                    <Form-item label="道路编号">
                        <Input v-model="road.RoadNo" placeholder="023H48F0290376509"></Input>
                    </Form-item>
                    <Form-item label="道路名称">
                        <Input v-model="road.RoadName" placeholder="锦衣路"></Input>
                    </Form-item>
                    <Form-item label="道路等级">
                        <Select v-model="road.RoadLevel" placeholder="支路">
                            <Option value="快速路">快速路</Option>
                            <Option value="主干路">主干路</Option>
                            <Option value="次干路">次干路</Option>
                            <Option value="支路">支路</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="养护等级">
                        <Select v-model="road.ConservationLevel" placeholder="3等养护道路">
                            <Option value="1等养护道路">1等养护道路</Option>
                            <Option value="2等养护道路">2等养护道路</Option>
                            <Option value="3等养护道路">3等养护道路</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="路长">
                        <Input v-model="road.RoadLength" placeholder="1420"></Input>
                    </Form-item>
                    <Form-item label="道路面积">
                        <Input v-model="road.RoadSquare" placeholder="17040"></Input>
                    </Form-item>
                    <Form-item label="路宽">
                        <Input v-model="road.RoadWidth" placeholder="12"></Input>
                    </Form-item>
                    <Form-item label="道路类型">
                        <Select v-model="road.RoadType" placeholder="水泥路">
                            <Option value="水泥路">水泥路</Option>
                            <Option value="沥青路">沥青路</Option>
                        </Select>
                    </Form-item>
<!--                    <Form-item label="isShow">-->
<!--                        <RadioGroup v-model="road.isShow">-->
<!--                            <Radio label="1">true</Radio>-->
<!--                            <Radio label="2">false</Radio>-->
<!--                        </RadioGroup>-->
<!--                    </Form-item>-->
                    <Form-item label="道路起点">
                        <Input v-model="road.RoadStart" placeholder="106.62288,29.663008"></Input>
                    </Form-item>
                    <Form-item label="道路终点">
                        <Input v-model="road.RoadEnd" placeholder="106.616445,29.663626"></Input>
                    </Form-item>
                    <Form-item label="道路走向">
                        <Input v-model="road.RoadDirection" placeholder="西北-东"></Input>
                    </Form-item>
                </Col>
                <Col span="12" >
                    <Form-item label="车道数">
                        <Input v-model="road.LaneNum" placeholder="2"></Input>
                    </Form-item>
                    <Form-item label="限速">
                        <Input v-model="road.Speed" placeholder="60"></Input>
                    </Form-item>
                    <Form-item label="路面等级">
                        <Select v-model="road.SurfaceLevel" placeholder="低级">
                            <Option value="高级">高级</Option>
                            <Option value="次高级">次高级</Option>
                            <Option value="中级">中级</Option>
                            <Option value="低级">低级</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="AADT">
                        <Input v-model="road.AADT" placeholder="400"></Input>
                    </Form-item>
                    <Form-item label="交通量等级">
                        <Select v-model="road.TranLevel" placeholder="特轻">
                            <Option value="特轻">特轻</Option>
                            <Option value="轻">轻</Option>
                            <Option value="中">中</Option>
                            <Option value="重">重</Option>
                            <Option value="特重">特重</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="建造日期">
                        <Date-picker type="date" placeholder="建造日期" v-model="road.BuildDate"></Date-picker>
                    </Form-item>
                    <Form-item label="路面厚度">
                        <Input v-model="road.SurfaceThick" placeholder="5"></Input>
                    </Form-item>
                    <Form-item label="基层类型">
                        <Select v-model="road.InnerType" placeholder="刚性基层">
                            <Option value="柔性基层">柔性基层</Option>
                            <Option value="半刚性基层">半刚性基层</Option>
                            <Option value="刚性基层">刚性基层</Option>
                            <Option value="复合式基层">复合式基层</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="基层厚度">
                        <Input v-model="road.InnerThick" placeholder="3"></Input>
                    </Form-item>
                    <Form-item label="设计单位">
                        <Input v-model="road.DesignCom" placeholder="重庆五牛规划设计集团"></Input>
                    </Form-item>
                    <Form-item label="施工单位">
                        <Input v-model="road.BuildCom" placeholder="重庆兴欣路桥建设有限公司"></Input>
                    </Form-item>
                    <Form-item label="管理单位">
                        <Input v-model="road.ManageCom" placeholder="重庆地方公路管理局"></Input>
                    </Form-item>
                    <Form-item>
                        <Button type="primary" @click="handleSubmit('road')">提交</Button>
                        <Button type="ghost" @click="handleReset('road')" style="margin-left: 8px">重置</Button>
                    </Form-item>
                </Col>
            </Form>
        </Row>
    </div>
</template>
<script>
    export default {
        data() {
            return{
                road: {
                    "OT": 2,
                    "RoadNo": "023H48F0290376509",         //道路编号
                    "RoadName": "锦衣路",       //路名
                    "RoadLevel": [
                        {
                            value: "快速路",
                            label: "快速路"
                        },
                        {
                            value: "主干路",
                            label: "主干路"
                        },
                        {
                            value: "次干路",
                            label: "次干路"
                        },
                        {
                            value: "支路",
                            label: "支路"
                        }
                    ],       //道路等级
                    "RoadLevel": "支路",
                    "ConservationLevel": [
                        {
                            value: "1等养护道路",
                            label: "1等养护道路"
                        },
                        {
                            value: "2等养护道路",
                            label: "2等养护道路"
                        },
                        {
                            value: "3等养护道路",
                            label: "3等养护道路"
                        }
                    ],       //养护等级
                    "ConservationLevel": "3等养护道路",
                    "RoadLength": "1420",         //路长
                    "RoadSquare": "17040",       //道路面积
                    "RoadWidth": "12",         //路宽
                    "RoadType": [
                        {
                            value: "水泥路",
                            label: "水泥路"
                        },
                        {
                            value: "沥青路",
                            label: "沥青路"
                        }
                    ],       //道路类型
                    "RoadType": "水泥路",
                    // "isShow": "1",
                    "RoadStart": "106.62288,29.663008",       //道路起点
                    "RoadEnd": "106.616445,29.663626",        //道路终点
                    "RoadDirection": "西北-东",      //道路走向
                    "LaneNum": "2",        //车道数
                    "Speed": "60",          //限速
                    "SurfaceLevel": [
                        {
                            value: "高级",
                            label: "高级"
                        },
                        {
                            value: "次高级",
                            label: "次高级"
                        },
                        {
                            value: "中级",
                            label: "中级"
                        },
                        {
                            value: "低级",
                            label: "低级"
                        }
                    ],   //路面等级
                    "SurfaceLevel": "低级",
                    "AADT": "400",       //AADT
                    "TranLevel": [
                        {
                            value: "特轻",
                            label: "特轻"
                        },
                        {
                            value: "轻",
                            label: "轻"
                        },
                        {
                            value: "中",
                            label: "中"
                        },
                        {
                            value: "重",
                            label: "重"
                        },
                        {
                            value: "特重",
                            label: "特重",
                        }
                    ],  //交通量等级
                    "TranLevel": "特轻",
                    "BuildDate": "1996-11-22",      //建造日期
                    "SurfaceThick": 5,       //路面厚度
                    "InnerType": [
                        {
                            value: "柔性基层",
                            label: "柔性基层"
                        },
                        {
                            value: "半刚性基层",
                            label: "半刚性基层"
                        },
                        {
                            value: "刚性基层",
                            label: "刚性基层"
                        },
                        {
                            value: "复合式基层",
                            label: "复合式基层"
                        }
                    ],       //基层类型
                    "InnerType": "刚性基层",
                    "InnerThick": 3,       //基层厚度
                    "DesignCom": "重庆五牛规划设计集团",       //设计单位
                    "BuildCom": "重庆兴欣路桥建设有限公司",       //施工单位
                    "ManageCom": "重庆地方公路管理局",       //管理单位
                    "Token": this.$store.state.verification.Token,
                },
                result: 0,
            }
        },
        methods:{
            handleSubmit(){
                let ws = new WebSocket(this.$store.state.verification.Address);

                this.road.RoadLength = parseFloat(this.road.RoadLength);
                this.road.RoadWidth = parseFloat(this.road.RoadWidth);
                this.road.RoadSquare = parseFloat(this.road.RoadSquare);
                this.road.LaneNum = parseInt(this.road.LaneNum);
                this.road.Speed = parseInt(this.road.Speed);
                this.road.AADT = parseInt(this.road.AADT);
                this.road.SurfaceThick = parseFloat(this.road.SurfaceThick);
                this.road.InnerThick = parseFloat(this.road.InnerThick);

                //发送
                ws.onopen =()=> {
                    ws.send(JSON.stringify(this.road));
                };
                //接收
                ws.onmessage =(event)=>{
                    var json = JSON.parse(event.data);
                    this.result = json['result'];
                    if (this.result === 1){
                        this.$Message.success('提交成功!');
                    }
                     if (this.result === 0){
                        this.$Message.error('操作失败!');
                    }
                     if (this.result === -1){
                         this.$Message.error('权限不足!');
                     }
                }
            },
            handleReset () {
                // Object.assign(this.$data.road, this.$options.data().road);
                this.road.RoadLevel = "";
                this.road.ConservationLevel = "";
                this.road.RoadType = "";
                this.road.SurfaceLevel = "";
                this.road.TranLevel = "";
                this.road.InnerType = "";
            },
        }
    }
</script>

<style scoped>

</style>