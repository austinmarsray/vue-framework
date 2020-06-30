<template>
    <div class="animated fadeIn">
        <Row>
            <Col span="24" >
                <Form :label-width="80">
                    <Form-item label="姓名" prop="name">
                        <Input v-model="name" placeholder="请输入姓名"></Input>
                    </Form-item>
                    <Form-item label="邮箱" prop="mail">
                        <Input v-model="mail" placeholder="请输入邮箱"></Input>
                    </Form-item>

                    <Form-item label="性别" prop="gender">
                        <RadioGroup v-model="sex">
                            <Radio label="男"></Radio>
                            <Radio label="女"></Radio>
                        </RadioGroup>
                    </Form-item>

                    <Form-item label="城市" prop="city">
                        <Select v-model="city" placeholder="请选择所在地">
                            <Option value="beijing">北京市</Option>
                            <Option value="shanghai">上海市</Option>
                            <Option value="shenzhen">深圳市</Option>
                        </Select>
<!--                        <Select v-model="model1" style="width:200px">-->
<!--                            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
<!--                        </Select>-->
                    </Form-item>
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
                    <form-item>
                        <Button type="primary" @click="handleSubmit()">提交</Button>
                    </form-item>
                </Form>

            </Col>
        </Row>
    </div>
</template>

<script>
    import AsphaltRoad from "./components/el-table";
    export default {
        name: "VueTest",
        data () {
            return {
                sex: '男',
                name: '',
                mail: '',
                city: '',
                cityList: [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                    {
                        value: 'London',
                        label: 'London'
                    },
                    {
                        value: 'Sydney',
                        label: 'Sydney'
                    },
                    {
                        value: 'Ottawa',
                        label: 'Ottawa'
                    },
                    {
                        value: 'Paris',
                        label: 'Paris'
                    },
                    {
                        value: 'Canberra',
                        label: 'Canberra'
                    }
                ],
                model1: '',
                select_1: "",
                //option_1: ["沥青路", "水泥路"],
                select_2: "",
                option_2: [],
                select_3: "",
                option_3: []
            }
        },
        methods: {
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
                // if (this.select_1 === "沥青路"){
                //     let x = ["裂缝类", "变形类", "松散类", "其他类"];
                //     this.option_2.push("裂缝类");
                //     this.option_2.push("变形类");
                //     this.option_2.push("松散类");
                //     this.option_2.push("其他类");
                //     // this.option_2 = x;
                //
                // }
                // if (this.select_1 === "水泥路"){
                //      let y = ["裂缝类", "接缝破坏类", "表面破坏类", "其他类"];
                //      this.option_2.push("裂缝类");
                //      this.option_2.push("接缝破坏类");
                //      this.option_2.push("表面破坏类");
                //      this.option_2.push("其他类");
                //      // this.option_2 = y;
                // }
            },
            func_select2 (){
                console.log(this.option_2)
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
            },
            handleSubmit (){

                console.log(this.$store.state.verification.UserName)
            }
        }
    }
</script>

<style scoped>

</style>