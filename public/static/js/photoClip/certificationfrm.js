

function loaded()
{
//	alert("loaded");
    //topMenu
    var objTopMenu = new TopMenu("topMenu-wrapper",
            {
                backgroundColor: "#990000", //背景颜色
                fontColor: "white", //字体颜色

                name: "上传名片", //中间名称
                nameSize: "1.6rem", //字体尺寸，范围=1rem~2rem
                nameWeight: "bold", //字体加粗，normal、bold

                /*leftName: "上一步",//左侧名称
                 leftNameSize: "1.4em",//字体尺寸，范围=1rem~2rem
                 leftNameWeight: "normal",//字体加粗，normal、bold*/

                /*rightName: "下一步",//右侧名称
                 rightNameSize: "1.4rem",//字体尺寸，范围=1rem~2rem
                 rightNameWeight: "normal",//字体加粗，normal、bold*/

//		leftIcon: "img/back-white.png",//左侧图标

//		rightIcon: "img/userMale-white.png",//右侧图标

                callbackClickLeft: function ()
                {//单击左侧名称、左侧图标
//			alert("callbackClickLeft");
                },

                callbackClickRight: function ()
                {//单击右侧名称、右侧图标
                    alert("callbackClickRight");
                }
            });


    photoClipInterfaceInit(
            "#photoClip-interface",
            "#photoClip-interface #topMenu-wrapper2 .topMenu-rightName",
            "#headPortrait-interface",
            "#headPortrait-interface #headPortrait-wrapper");
}
