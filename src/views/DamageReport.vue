<template>
    <div class="animated fadeIn">
        <Row>
            <Col>
                <Form :label-width="80" :model="DamageReport">
                    <Col span="12">
                        <Form-item label="路名">
                            <Input v-model="DamageReport.RoadName" placeholder="" @on-blur="func_RoadName_RoadNo()"></Input>
                        </Form-item>
                        </Col>
                        <Col span="12">
                        <Form-item label="道路编号">
                            <Input v-model="DamageReport.RoadNo" placeholder="" readonly></Input>
                        </Form-item>
                    </Col>
                    <Col span="12">
                        <form-item label="损坏类型">
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
                    <Col span="12">
                        <Form-item label="定期检查号">
                            <Input v-model="DamageReport.RegularNo" placeholder="" readonly></Input>
                        </Form-item>
                    </Col>
                    <Col span="24">
                        <Form-item label="日期">
                            <Date-picker type="date" placeholder="日期" v-model="DamageReport.ReportDate" ></Date-picker>
                        </Form-item>
                    </Col>
                    <Col span="12">
                        <Form-item label="检查长度">
                            <Input v-model="DamageReport.CheckLength" placeholder=""></Input>
                        </Form-item>
                    </Col>
                    <Col span="12">
                        <Form-item label="检查宽度">
                            <Input v-model="DamageReport.CheckWidth" placeholder=""></Input>
                        </Form-item>
                    </Col>
                    <Col span="12">
                        <Form-item label="损坏长度">
							<Input v-model="DamageReport.DamageLength" placeholder=""></Input>
						</Form-item>
                    </Col>
                    <Col span="12">
						<Form-item label="损坏宽度">
							<Input v-model="DamageReport.DamageWidth" placeholder="" ></Input>
						</Form-item>
                    </Col>
                    <Col span="12">
                        <Form-item label="损坏深度">
							<Input v-model="DamageReport.DamageDepth" placeholder=""></Input>
						</Form-item>
                    </Col>
<!--                    <Col span="12">-->
<!--						<Form-item label="损坏面积">-->
<!--							<Input v-model="DamageReport.DamageSquare" placeholder="" ></Input>-->
<!--						</Form-item>-->
<!--                    </Col>-->
                    <Col span="24">
                        <Form-item>
                            <Button type="primary" @click="handleSubmit('DamageReport')">提交</Button>
                            <Button type="ghost" @click="handleReset('DamageReport')" style="margin-left: 8px">重置</Button>
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
                DamageReport: {
                   "OT":8 ,
					"RoadNo": "",               //道路编号
					"RoadName": "",             //路名
					"CheckLength": "",          //检查长度
					"CheckWidth": "",           //检查宽度
                    "DamageType": "",           //损坏类型
					"DamageLength": "",         //损坏长度
					"DamageWidth": "",          //损坏宽度
					"DamageDepth": "",          //损坏深度
					"RegularNo": "",            //定期检查编号
					"UserNo": this.$store.state.verification.UserNo,               //用户编号
					"ReportDate": new Date(),           //日期
					"Token": this.$store.state.verification.Token,
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
                this.DamageReport.DamageType = this.select_1 + this.select_2 + this.select_3;

                //发送
                ws.onopen =()=> {
                    ws.send(JSON.stringify(this.DamageReport));
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
                // Object.assign(this.$data.DamageReport, this.$options.data().DamageReport);
                let x =  {
                   "OT":8 ,
					"RoadNo": "",               //道路编号
					"RoadName": "",             //路名
					"CheckLength": "",          //检查长度
					"CheckWidth": "",           //检查宽度
                    "DamageType": "",           //损坏类型
					"DamageLength": "",         //损坏长度
					"DamageWidth": "",          //损坏宽度
					"DamageDepth": "",          //损坏深度
					"RegularNo": "",            //定期检查编号
					"UserNo": this.$store.state.verification.UserNo,               //用户编号
					"ReportDate": new Date(),           //日期
					"Token": this.$store.state.verification.Token,
                };
                this.select_1 = "";
                this.DamageReport = x;
            },
            func_RoadName_RoadNo (){
                this.DamageReport.RoadNo = "";
                this.DamageReport.RegularNo = "";
                if (this.DamageReport.RoadName ===""){
                    return;
                }

                let ws = new WebSocket(this.$store.state.verification.Address);
                let text = {"OT":10 , "RoadName":this.DamageReport.RoadName , "Token":this.DamageReport.Token};

                ws.onopen =()=> {
                    ws.send(JSON.stringify(text));
                };

                ws.onmessage =(event)=>{
                    var json = JSON.parse(event.data);
                    this.result = json['result'];
                    if (this.result === 1){
                        this.DamageReport.RoadNo = json['RoadNo'];
                        this.DamageReport.RegularNo = json['RegularNo'];
                    }
                    if (this.result === 0) {
                        this.$Message.error('该路不存在!');
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