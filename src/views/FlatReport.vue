<template>
    <div class="animated fadeIn">
        <Row>
            <Col>
                <Form :label-width="80" :model="FlatReport">
                    <Col span="12">
                        <Form-item label="路名">
                            <Input v-model="FlatReport.RoadName" placeholder="" @on-blur="func_RoadName_RoadNo()"></Input>
                        </Form-item>
                    </Col>
                    <Col span="12">
                        <Form-item label="道路编号">
                            <Input v-model="FlatReport.RoadNo" placeholder="" readonly></Input>
                        </Form-item>
                    </Col>
                    <Col span="12">
                        <Form-item label="定期检查号">
                            <Input v-model="FlatReport.RegularNo" placeholder="" readonly></Input>
                        </Form-item>
                    </Col>
                    <Col span="12">
                         <Form-item label="IRI">
                            <Input v-model="FlatReport.IRI" placeholder=""></Input>
                        </Form-item>
                    </Col>
                    <Col span="24">
                        <Form-item label="日期">
                            <Date-picker type="date" placeholder="日期" v-model="FlatReport.ReportDate" readonly></Date-picker>
                        </Form-item>
    <!--                    <Form-item label="用户编号">-->
    <!--                        <Input v-model="FlatReport.UserNo" placeholder=""></Input>-->
    <!--                    </Form-item>-->
                        <Form-item label="备注">
                            <Input v-model="FlatReport.Description" placeholder=""></Input>
                        </Form-item>
                        <Form-item>
                            <Button type="primary" @click="handleSubmit('FlatReport')">提交</Button>
                            <Button type="ghost" @click="handleReset('FlatReport')" style="margin-left: 8px">重置</Button>
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
                FlatReport: {
                    "OT":7 ,
                    "RoadNo": "",               //道路编号
                    "RoadName": "",             //路名
                    "IRI": "",
                    "ReportDate": new Date(),           //日期
                    "UserNo": this.$store.state.verification.UserNo,               //用户编号
                    "Description": "",          //备注
                    "RegularNo": "",            //定期检查编号
                    "Token": this.$store.state.verification.Token,
                }
            }
        },
        methods: {
            handleSubmit(){
                let ws = new WebSocket(this.$store.state.verification.Address);
                this.FlatReport.IRI = parseFloat(this.FlatReport.IRI);
                console.log(this.$store.state.verification);
                //发送
                ws.onopen =()=> {
                    ws.send(JSON.stringify(this.FlatReport));
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
                // Object.assign(this.$data.FlatReport, this.$options.data().FlatReport);
                let x = {
                    "OT":7 ,
                    "RoadNo": "",               //道路编号
                    "RoadName": "",             //路名
                    "IRI": "",
                    "ReportDate": new Date(),           //日期
                    "UserNo": this.$store.state.verification.UserNo,               //用户编号
                    "Description": "",          //备注
                    "RegularNo": "",            //定期检查编号
                    "Token": this.$store.state.verification.Token,
                };
                this.FlatReport = x;
            },
            func_RoadName_RoadNo (){
                this.FlatReport.RoadNo = "";
                this.FlatReport.RegularNo = "";

                if (this.FlatReport.RoadName ===""){
                    return;
                }
                let ws = new WebSocket(this.$store.state.verification.Address);
                let text = {"OT":10 , "RoadName":this.FlatReport.RoadName , "Token":this.FlatReport.Token};
                ws.onopen =()=> {
                    ws.send(JSON.stringify(text));
                };

                ws.onmessage =(event)=>{
                    var json = JSON.parse(event.data);
                    this.result = json['result'];
                    if (this.result === 1){
                        this.FlatReport.RoadNo = json['RoadNo'];
                        this.FlatReport.RegularNo = json['RegularNo'];
                    }
                    if (this.result === 0) {
                        this.$Message.error('该路不存在!');
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>