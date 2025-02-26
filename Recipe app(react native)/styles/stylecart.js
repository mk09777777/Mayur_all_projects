import React from "react";
import { ScaledSheet } from "react-native-size-matters";

export default Cartstyle = ScaledSheet.create({
    body:{
        backgroundColor: "#212121",
        flex: 1,
        height: '100%',
        width: '100%',
    },
    heading:{
        marginTop:"15@vs",
        marginLeft:"5@s",
        display:"flex",
        flexDirection:"row",
    },
    backicon:{
        height:"34@vs",
        width:"34@s",
        marginTop:"10@vs"

    },
    ordertext:{
        color:"white",
        fontSize:"27@ms",
        marginLeft:"95@s",
        marginTop:"10@vs",
        fontWeight:"bold"
        },
    menulist:{
        marginLeft:"10@s",
        marginTop:"20@vs",
        height:"230@vs",
        width:"330@s",
        
    },
    menuItem:{
        width:"325@s",
        height:"70@vs",
        borderRadius:"10@ms",
        backgroundColor: "#2D2D2D",
        marginTop:"10@vs",
        borderWidth:"1@ms",
        borderColor:"#3a3939",
        display:"flex",
        flexDirection:"row"
    }  ,
    menuImage:{
        height:"55@vs",
        width:"55@s",
        marginLeft:"10@s",
        marginTop:"7@vs"
    } ,
  
    menuText:{
          marginLeft:"30@s",
        marginTop:"10@vs",
        color:"white",
        fontSize:"18@ms"

    },
    menuPrice:{
        color:"#FFE598",
        marginLeft:"30@s",
     marginTop:"5@vs",
        fontSize:"18@ms"

    },
    closeimg:{
        height:"15@vs",
        width:"15@s",
         marginLeft:"70@s",
        marginTop:"25@vs"
    },
    bill:{
        marginTop:"40@vs",
        marginLeft:"10@s",
        display:"flex",
        flexDirection:"column"
    },
    totalstextcontainer:{
        display:"flex",
        flexDirection:"row",
    }
    ,
    totaltext:{
        color:"#8F8E8E",
        fontSize:"18@ms",
    },
    pricetotal:{
        color:"white",
        fontSize:"17@ms",
        marginLeft:"190@s"
    },
    totaltext2:{
        color:"#8F8E8E",
        fontSize:"18@ms",
        marginTop:"10@vs",
    },
    pricetotal2:{
        color:"white",
        fontSize:"17@ms",
        marginLeft:"230@s",
        marginTop:"10@vs",
    },
    pricetotal3:{
        color:"white",
        fontSize:"17@ms",
        marginLeft:"167@s",
        marginTop:"10@vs",
    },
    divider:{
        marginTop:"14@vs",
        width:"310@s",
        height:"1@vs"
    },
    totaltext4:{
        color:"white",
        fontSize:"18@ms",
        marginTop:"10@vs",
    },
    pricetotal4:{
        color:"#FFE598",
        fontSize:"17@ms",
        marginLeft:"210@s",
        marginTop:"10@vs",
    },
    totaltime:{
        color:"#8F8E8E",
        fontSize:"18@ms",
        marginTop:"40@vs",
    },
    pricetime:{
        color:"white",
        fontSize:"18@ms",
       
    },
    totaltime2:{
        color:"#8F8E8E",
        fontSize:"18@ms",
        marginTop:"20@vs",
    },
    placebutton:{
        height:"45@vs",
        width:"310@vs",
        backgroundColor:"#FFE598",
        borderRadius:"10@ms",
        marginTop:"20@vs"
    },
    placeordertext:{
        color:"#212121",
        marginTop:"10@vs",
        marginLeft:"110@s",
        fontSize:"19@ms",
        fontWeight:"bold"
    }
       
})