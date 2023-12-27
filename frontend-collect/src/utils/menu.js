const menu = {
    list() {
        return [
            // {"backMenu": [{
            //     "child": [{"buttons": ["查看", "修改", "删除"],
            //         "menu": "全部用户", "tableName": "user"}],
            //         "menu": "用户管理"},
            //     {
            //         "child": [{"buttons": ["查看", "修改", "删除"], "menu": "任务广场管理", "tableName": "mission"}],
            //         "menu": "任务管理"
            //     },
            //     {
            //         "child": [
            //             {"menu": "修改推荐规则", "tableName": "algorithm"},
            //             {"menu": "须知", "tableName": "notice"}
            //         ],
            //         "menu": "算法管理"},
            //     ],
            // "userTypeName": "管理员",
            // "userType": "admin"},
            {
                "backMenu": [
                    {
                        "child": [{"buttons": ["查看","接收"], "menu": "任务广场", "tableName": "mission"},
                            {"buttons": ["查看", "在线填写报告", "放弃"], "menu": "我的任务", "tableName": "myMission"}],
                        "menu": "任务管理"
                    }],
                "userTypeName": "个人用户",
                "userType": "employee"
            },
            {
                "backMenu": [
                    {
                        "child": [{"buttons": ["发布","查看"], "menu": "任务广场", "tableName": "mission"}
                        ,{"buttons": ["查看","修改","删除"], "menu": "我的任务", "tableName": "myMission"}],
                        "menu": "任务管理"
                    }],
                "userTypeName": "企业用户",
                "userType": "employer"
            },]
    }
}
export default menu;
