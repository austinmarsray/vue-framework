<template>
    <div class="animated fadeIn">
        <Row>
            <Col>
                <Form :label-width="80" :model="DailyReport">
                    <Col span="12">
                        <Form-item label="路名">
                            <Input v-model="DailyReport.RoadName" placeholder="" @on-blur="func_RoadName_RoadNo()"></Input>
                        </Form-item>
                        </Col>
                        <Col span="12">
                        <Form-item label="道路编号">
                            <Input v-model="DailyReport.RoadNo" placeholder="" readonly></Input>
                        </Form-item>
                    </Col>
                    <Col span="12">
<!--                        <Form-item label="损坏类型">-->
<!--                            <Select v-model="select_1" @on-change="select1_change()">-->
<!--                                <Option value="沥青路">沥青路</Option>-->
<!--                                <Option value="水泥路">水泥路</Option>-->
<!--                            </Select>-->

<!--                            <Select v-model="select_2" v-show="select_1==='沥青路'">-->
<!--                                <Option value="裂缝类">裂缝类</Option>-->
<!--                                <Option value="变形类">变形类</Option>-->
<!--                                <Option value="松散类">松散类</Option>-->
<!--                                <Option value="其他类">其他类</Option>-->
<!--                            </Select>-->
<!--                            <Select v-model="select_2" v-show="select_1==='水泥路'">-->
<!--                                <Option value="裂缝类">裂缝类</Option>-->
<!--                                <Option value="接缝破坏类">接缝破坏类</Option>-->
<!--                                <Option value="表面破坏类">表面破坏类</Option>-->
<!--                                <Option value="其他类">其他类</Option>-->
<!--                            </Select>-->

<!--                            <Select v-model="select_3" v-show="select_2==='裂缝类'">-->
<!--                                <Option value="线裂">线裂</Option>-->
<!--                                <Option value="网裂" v-show="select_1==='沥青路'">网裂 </Option>-->
<!--                                <Option value="龟裂" v-show="select_1==='沥青路'">龟裂 </Option>-->
<!--                                <Option value="板角断裂" v-show="select_1==='水泥路'">板角断裂</Option>-->
<!--                                <Option value="边角断裂" v-show="select_1==='水泥路'">边角断裂</Option>-->
<!--                                <Option value="交叉裂缝和破碎板" v-show="select_1==='水泥路'">交叉裂缝和破碎板</Option>-->
<!--                            </Select>-->
<!--                            <Select v-model="select_3" v-show="select_2==='变形类'">-->
<!--                                <Option value="拥包">拥包</Option>-->
<!--                                <Option value="车辙">车辙</Option>-->
<!--                                <Option value="沉陷">沉陷</Option>-->
<!--                                <Option value="翻浆">翻浆</Option>-->
<!--                            </Select>-->
<!--                            <Select v-model="select_3" v-show="select_2==='松散类'">-->
<!--                                <Option value="剥落">剥落</Option>-->
<!--                                <Option value="坑槽">坑槽</Option>-->
<!--                                <Option value="啃边">啃边</Option>-->
<!--                            </Select>-->
<!--                            <Select v-model="select_3" v-show="select_2==='其他类' && select_1==='沥青路'">-->
<!--                                <Option value="路框差">路框差</Option>-->
<!--                                <Option value="唧浆">唧浆</Option>-->
<!--                                <Option value="泛油">泛油</Option>-->
<!--                            </Select>-->
<!--                            <Select v-model="select_3" v-show="select_2==='接缝破坏类'">-->
<!--                                <Option value="接缝料损坏">接缝料损坏</Option>-->
<!--                                <Option value="边角剥落">边角剥落</Option>-->
<!--                            </Select>-->
<!--                            <Select v-model="select_3" v-show="select_2==='表面破坏类'">-->
<!--                                <Option value="坑洞">坑洞</Option>-->
<!--                                <Option value="表面纹裂">表面纹裂</Option>-->
<!--                                <Option value="层状剥落">层状剥落</Option>-->
<!--                            </Select>-->
<!--                            <Select v-model="select_3" v-show="select_2==='其他类' && select_1==='水泥路'">-->
<!--                                <Option value="错台">错台</Option>-->
<!--                                <Option value="拱胀">拱胀</Option>-->
<!--                                <Option value="唧浆">唧浆</Option>-->
<!--                                <Option value="路框差">路框差</Option>-->
<!--                                <Option value="沉陷">沉陷</Option>-->
<!--                            </Select>-->
<!--                            <Select v-model="select_3" v-show="select_2 === undefined ">-->
<!--                            </Select>-->
<!--                        </Form-item>-->
                        <form-item label="损坏程度">
                            <Select v-model="select_1" @on-change="func_select1()">
                                <Option value="沥青路">沥青路</Option>
                                <Option value="水泥路">水泥路</Option>
                            </Select>
                            <Select v-model="select_2" @on-change="func_select2()">
                                <Option v-for="item_2 in option_2" :value="item_2"></Option>
                            </Select>
                            <Select v-model="select_3">
                                <Option v-for="item_3 in option_3" :value="item_3"></Option>
                            </Select>
                        </form-item>
                    </Col>

                    <Col span="24">
    <!--                    <Form-item label="用户编号">-->
    <!--                        <Input v-model="DailyReport.UserNo" placeholder=""></Input>-->
    <!--                    </Form-item>-->
                        <Form-item label="日期">
                            <Date-picker type="date" placeholder="日期" v-model="DailyReport.ReportDate" readonly></Date-picker>
                        </Form-item>
                        <Form-item label="是否损坏">
                            <Radio-group v-model="DailyReport.IsDamageBad">
                                <Radio label="true">是</Radio>
                                <Radio label="false">否</Radio>
                            </Radio-group>
                        </Form-item>
                        <Form-item label="备注">
                            <Input v-model="DailyReport.DamageDescription" placeholder=""></Input>
                        </Form-item>
                        <Form-item>
                            <Button type="primary" @click="handleSubmit('DailyReport')">提交</Button>
                            <Button type="ghost" @click="handleReset('DailyReport')" style="margin-left: 8px">重置</Button>
                        </Form-item>
                    </Col>
                </Form>
            </Col>
        </Row>
    </div>
</template>

<script>
    export default {
        data (){
            return {
                DailyReport: {
                    "OT":6 ,
                    "RoadNo": "",               //道路编号
                    "RoadName": "",             //路名
                    "DamageType": "",           //损坏类型
                    "UserNo": this.$store.state.verification.UserNo,               //用户编号
                    "ReportDate": new Date(),           //日期
                    "IsDamageBad": "",          //是否损坏
                    "DamageDescription": "",    //备注
                    "Token":this.$store.state.verification.Token,
                },
                select_1: "",
                //option_1: ["沥青路", "水泥路"],
                select_2: "",
                option_2: [],
                select_3: "",
                option_3: []
            }
        },
        methods: {
            handleSubmit(){
                let ws = new WebSocket(this.$store.state.verification.Address);
                this.DailyReport.DamageType = this.select_1 + this.select_2 + this.select_3;

                //发送
                ws.onopen =()=> {
                    ws.send(JSON.stringify(this.DailyReport));
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
                // Object.assign(this.$data.DailyReport, this.$options.data().DailyReport);
                let x = {
                    "OT":6 ,
                    "RoadNo": "",               //道路编号
                    "RoadName": "",             //路名
                    "DamageType": "",           //损坏类型
                    "UserNo": this.$store.state.verification.UserNo,               //用户编号
                    "ReportDate": new Date(),           //日期
                    "IsDamageBad": "",          //是否损坏
                    "DamageDescription": "",    //备注
                    "Token":this.$store.state.verification.Token,
                };
                this.DailyReport = x;
                this.select_1 = "";
            },
            func_RoadName_RoadNo (){
                let ws = new WebSocket(this.$store.state.verification.Address);
                let text = {"OT":5 , "RoadName":this.DailyReport.RoadName , "Token":"LHX123"};

                if (this.DailyReport.RoadName ===""){
                    return;
                }
                ws.onopen =()=> {
                    ws.send(JSON.stringify(text));
                };

                ws.onmessage =(event)=>{
                    var json = JSON.parse(event.data);
                    this.result = json['result'];
                    if (this.result === 1){
                        this.DailyReport.RoadNo = json['RoadNo'];
                    }
                    if (this.result === 0) {
                        this.$Message.error('该路不存在!');
                        this.DailyReport.RoadNo = "";
                    }
                }
            },
            func_select1 (){
                this.option_2 = [];
                this.select_2 = "";
                this.option_2.push("裂缝类");
                if (this.select_1 === "沥青路"){
                    this.option_2.push("变形类");
                    this.option_2.push("松散类");
                }
                if (this.select_1 === "水泥路"){
                    this.option_2.push("接缝破坏类");
                    this.option_2.push("表面破坏类");
                }
                this.option_2.push("其他类");
            },
            func_select2 (){
                this.option_3 = [];
                this.select_3 = "";
                let x = [];
                if (this.select_2 === "裂缝类"){
                    if(this.select_1 === "沥青路"){
                         x = ["线裂", "网裂", "龟裂"];
                    }
                    if (this.select_1 === "水泥路"){
                         x = ["线裂", "板角断裂", "边角断裂", "交叉裂缝和破碎板"];
                    }
                }
                if (this.select_2 === "变形类"){
                    x = ["拥包", "车辙", "沉陷", "翻浆"];
                }
                if (this.select_2 === "松散类"){
                    x = ["剥落", "坑槽", "啃边"];
                }
                if (this.select_2 === "接缝破坏类"){
                    x = ["接缝料损坏", "边角剥落"];
                }
                if (this.select_2 === "表面破坏类"){
                    x = ["坑洞", "表面纹裂", "层状剥落"];
                }
                else if (this.select_2 === "其他类"){
                    if(this.select_1 === "沥青路"){
                         x = ["路框差", "唧浆", "泛油"];
                    }
                    if (this.select_1 === "水泥路"){
                         x = ["错台", "拱胀", "唧浆", "路框差", "沉陷"];
                    }
                }
                this.option_3 = x;
            }
        }
    }
</script>

<style scoped>

</style>