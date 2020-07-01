<template>
    <div class="animated fadeIn">
        <Row>
            <Col>
                <Form>
                    <Form-item>
                        <Button type="info" @click="handleView('DailyReport')">获取定期检测计划</Button>
                        <Button type="primary" @click="handleSubmit('DailyReport')" style="margin-left: 25px">添加定期检测</Button>
                    </Form-item>
                    <Form-item>
                        <Table border :columns="columns12" :data="data6"></Table>
                    </Form-item>
                </Form>

                <Modal :value="istrue" @on-cancel="func_cancel()" @on-ok="func_ok()">
                    <Form :label-width="80" :model="RegularReport">
                        <Form-item label="检查描述">
                                <Input v-model="RegularReport.RegularName" placeholder="" ></Input>
                        </Form-item>
                        <Form-item label="道路编号">
                                <Input v-model="RegularReport.RoadNo" placeholder="" ></Input>
                        </Form-item>
                        <Form-item label="开始日期">
                                <Date-picker type="date" placeholder="日期" v-model="RegularReport.StartDate" @on-change="RegularReport.StartDate=$event"></Date-picker>
                        </Form-item>
                        <Form-item label="结束日期">
                                <Date-picker type="date" placeholder="日期" v-model="RegularReport.EndDate" @on-change="RegularReport.EndDate=$event"></Date-picker>
                        </Form-item>
                    </Form>
                </Modal>
            </Col>
        </Row>
    </div>

</template>

<script>
    export default {
        name: "RegularReport",
        data (){
            return{
                RegularReport: {
                    "OT": 11,
                    "RegularName": "",      //定期检查描述
                    "RoadNo": "",           //道路编号
                    "StartDate": "",        //开始日期
                    "EndDate": "",          //结束日期
                    "Token": this.$store.state.verification.Token,
                },
                istrue: false,
                columns12: [
                    {
                        title: '定期检查编号',
                        key: 'RegularNo'
                    },
                    {
                        title: '定期检查描述',
                        key: 'RegularName'
                    },
                    {
                        title: '道路编号',
                        key: 'RoadNo'
                    },
                    {
                        title: '道路名称',
                        key: 'RoadName'
                    },
                ],
                data6: []
            }
        },
        methods: {
            handleSubmit (){
                this.istrue = !this.istrue;
            },
            handleView (){
                // let ws = new WebSocket(this.$store.state.verification.Address);
                let text = {"OT": 12, "Token": this.RegularReport.Token};
                //发送
                // ws.onopen =()=> {
                //     ws.send(JSON.stringify(text));
                // };
                websocket.send(JSON.stringify(text));
                websocket.onmessage =(event)=>{
                    var json = JSON.parse(event.data);
                    this.result = json['result'];
                    if (this.result === 1){
                        this.$Message.success('获取成功!');

                        let x = json['info'];
                        console.log(x);
                        this.data6 = x;
                    }
                     if (this.result === 0){
                        this.$Message.error('操作失败!');
                    }
                     if (this.result === -1){
                         this.$Message.error('权限不足!');
                     }
                };
            },
            func_cancel (){
                this.RegularReport.RegularName = "";
                this.RegularReport.RoadNo = "";
                this.RegularReport.StartDate = "";
                this.RegularReport.EndDate = "";
                this.istrue = !this.istrue;
            },
            func_ok (){

                // let ws = new WebSocket(this.$store.state.verification.Address);

                //发送
                // ws.onopen =()=> {
                //     ws.send(JSON.stringify(this.RegularReport));
                //
                //     // let text = {"RegularName":this.RegularReport.RegularName,"RoadNo":this.RegularReport.RoadNo,"StartDate":this.RegularReport.StartDate,"EndDate":this.RegularReport.EndDate};
                //     // this.data6.push(text);
                // };
                websocket.send(JSON.stringify(this.RegularReport));
                //接收
                websocket.onmessage =(event)=>{
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
                };

                this.istrue = !this.istrue;
            },
            show (index) {
                this.$Modal.info({
                    title: 'RegularReport Info',
                    content: `定期检查编号：${this.data6[index].RegularNo}<br>定期检查描述：${this.data6[index].RegularName}<br>道路编号：${this.data6[index].RoadNo}<br>道路名称：${this.data6[index].RoadName}`
                })
            },
            // remove (index) {
            //     this.data6.splice(index, 1);
            // }
        }
    }
</script>

<style scoped>

</style>