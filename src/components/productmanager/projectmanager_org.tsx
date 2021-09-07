// import React from 'react';
// import Nav from "../nav";
// import MaterialTable from 'material-table';
// import axios from 'axios';


// class ProductManager extends React.Component {

//     state = {
//         data: [],
//         ifExecute: true,
//        pageRows: 5
//     }

//     getApiData = () => {

//         var api = "http://206.189.39.185:5031/api/Product"
//         axios.get(api)
//             .then(res => {
//                 // console.log(res.data.data);
//                 this.setState({
//                     data: res.data.data  //获取的数据保存到data数组
//                 })
//             })
//             .catch(err => {
//                 console.error(err);
//             })
//     }

//     //不同屏幕宽度不同显示行数
//     handleResize = e => {

//         //e.target.innerWidth是浏览器窗口的宽度
//         console.log(e.target.innerWidth)
//         if( e.target.innerWidth<950){
//                 this.setState({ pageRows :  5})
//                 console.log(this.state.pageRows)
//         }else{

//             this.setState({ pageRows : 10 })
//             console.log(this.state.pageRows)
//         }

//       }

//     // 生命周期函数---渲染后调用
//     componentDidMount() {

//         this.getApiData();
//         window.addEventListener('resize', this.handleResize.bind(this)) 
//     }

//     changeType = (newData) => {
//         newData.priceRrp = parseInt(newData.priceRrp)
//         newData.priceShopify = parseInt(newData.priceShopify)
//         newData.priceAgent = parseInt(newData.priceAgent)
//         newData.price1212 = parseInt(newData.price1212)
//         newData.priceSpecial = parseInt(newData.priceSpecial)
//         newData.packageQty = parseInt(newData.packageQty)
//         newData.weight = parseInt(newData.weight)

//         return newData
//     }

//     handelAdd = (newData) => {

//         if (newData.productName == null) {
//             this.setState({ ifExecute: false })
//             alert(" Created Unsuccessfully. Please input valid Product Name.")
//         }

//         this.judgeInteger(newData.productCode, "product code")
//         this.judgeInteger(newData.priceRrp, "PRP Price")
//         this.judgeInteger(newData.priceShopify, " Shopify price")
//         this.judgeInteger(newData.priceAgent, "price agent")
//         this.judgeInteger(newData.price1212, "1212 pricy")
//         this.judgeInteger(newData.priceSpecial, "special price ")
//         this.judgeInteger(newData.packageQty, "Package Qty")
//         this.judgeInteger(newData.weight, "weight")

//         if (this.state.ifExecute) {
//             newData = this.changeType(newData)
//             this.getAddApi(newData)
//         }
//     }
//     //Add调取API之前先判断
//     judgeInteger = (property, name) => {
//         let priceTest = /^[1-9]\d*$/ //正整数
//         if (property != null) {
//             if (property.match(priceTest)) {
//                 this.setState({ ifExecute: true })

//             } else {
//                 this.setState({ ifExecute: false })
//                 alert(" Created Unsuccessfully. Please input valid " + name)


//             }
//         }
//     }

//     getAddApi = (newData) => {
//         console.log(newData, typeof (newData))
//         axios.post("http://206.189.39.185:5031/api/Product/ProductCreate", newData)
//             .then(response => {
//                 this.setState({ data: [...this.state.data, newData] })
//                 alert(" Created Successfully");
//             }
//             )
//             .catch((error) => {
//                 alert(" Created Unsuccessfully. Please input valid information.");
//                 return error;
//             })
//     }

//     handelUpdate = async (index, newData, oldData) => {

//         newData = this.changeType(newData)

//         axios.put("http://206.189.39.185:5031/api/Product/ProductUpdate", newData)
//             .then(response => {
//                 if (response.data !== oldData) {

//                     alert("Service Updated Successfully");
//                 }
//                 else {
//                     alert("Service Updated Unsuccessfully");
//                 }

//             });
//     }

//     handelDelete = (productId) => {
//         axios.delete("http://206.189.39.185:5031/api/Product/" + productId)
//             .then(response => {
//                 if (response.data != null) {
//                     alert("Service delete Successfully");
//                 }
//             });
//     }

//     render() {
//         return (
//             <React.Fragment>
//                 <Nav />
//                 <div className="container-fluid">
//                     <MaterialTable
//                         title="Product Management"

//                         columns={
//                             [
//                                 {
//                                     title: 'Product Image',
//                                     field: 'imageUrl',
//                                     render: (rowData: any) => {
//                                         return (
//                                             rowData.imageUrl && <img src={rowData.imageUrl} alt="" style={{ width: "50px", borderRadius: '50%' }} />
//                                         )
//                                     }
//                                 },
//                                 { title: 'Product Name', field: 'productName' },
//                                 { title: 'product Code', field: 'productCode' },
//                                 { title: 'PRP Price(CNY)', field: 'priceRrp' },
//                                 { title: 'Shopify Price(CNY)', field: 'priceShopify' },
//                                 { title: 'Agent Price(CNY)', field: 'priceAgent' },
//                                 { title: '1212 Pricy(CNY)', field: 'price1212' },
//                                 { title: 'Special Price', field: 'priceSpecial' },
//                                 { title: 'Size(mm)', field: 'desciption' },
//                                 { title: 'Weight(KG)', field: 'weight' },
//                                 { title: 'Package Qty', field: 'packageQty' },
//                                 { title: 'Product(ID)', field: 'productId' }
//                             ]
//                         }

//                         data={this.state.data}

//                         options={{
//                             addRowPosition: 'first',
//                          //   maxBodyHeight: '500px',
//                             showEmptyDataSourceMessage: false,
//                             actionsColumnIndex: -1,
//                             rowStyle: {
//                                 fontSize: "13px",

//                             },
//                             pageSize:this.state.pageRows,
//                             headerStyle: {
//                                 position: "sticky",
//                                 top: 0,
//                                 fontSize: "14px",
//                                 backgroundColor: "#E5E7E9"
//                             }

//                         }}

//                         editable={{
//                             onRowAdd: (newData: any) =>

//                                 new Promise((resolve, reject) => {

//                                     setTimeout(() => {
//                                         this.handelAdd(newData)
//                                         // this.setState({ data: [...this.state.data, newData] });

//                                         resolve("");
//                                     }, 1000)
//                                 }
//                                 ),
//                             onRowUpdate: (newData, oldData) =>
//                                 new Promise((resolve, reject) => {
//                                     setTimeout(() => {

//                                         const dataUpdate: any = [...this.state.data];
//                                         const index = oldData.tableData.id;
//                                         dataUpdate[index] = newData;

//                                         this.handelUpdate(index, newData, oldData)
//                                         this.setState({ data: dataUpdate });

//                                         resolve("");
//                                     }, 1000)
//                                 }),
//                             onRowDelete: oldData =>
//                                 new Promise((resolve, reject) => {
//                                     setTimeout(() => {
//                                         const dataDelete = [...this.state.data];
//                                         const index = oldData.tableData.id;
//                                         dataDelete.splice(index, 1);

//                                         this.handelDelete(oldData.productId)
//                                         this.setState({ data: [...dataDelete] });

//                                         resolve("")
//                                     }, 1000)
//                                 })
//                         }}
//                     />
//                 </div>

//             </React.Fragment>

//         );
//     }
// }

// export default ProductManager;

import React from 'react'

const projectmanager_org = () => {
    return (
        <div>
            
        </div>
    )
}

export default projectmanager_org

