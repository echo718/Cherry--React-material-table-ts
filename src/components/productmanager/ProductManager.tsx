
import React from 'react';
import Nav from "../nav";
import MaterialTable, { MTableToolbar } from 'material-table';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

class ProductManager extends React.Component {
    state = {
        data: [],
        ifExecute: true,
        pageSize: window.innerWidth > 1024 ? 10 : 5,
        searchCreatedFrom: '',
        searchCreatedTo: '',
        showCreatedSearch: false,
        ImageMaxSize:1024 * 1024,
        res: '', //for upload img 
        isDisplayImgDelBtn: false //for display delete img btn
    }

    getApiData = () => {
        var api = "http://206.189.39.185:5031/api/Product"
        axios.get(api)
            .then(res => {
               
                this.setState({
                    data: res.data.data  //获取的数据保存到data数组
                })
               
            })
            .catch(err => {
                console.error(err);
            })
        //添加请求 interceptors
        axios.interceptors.request.use(
            config => {
                return config;
            },
            error => {
                Promise.reject(error);
            })

        // 添加响应interceptors
        axios.interceptors.response.use((response: any) => {
            // return response;
            if (response.status >= 200 && response.status < 300 && response.data && response.headers) {
                // success
                return response

            } else {
                return response
            }


        }, function (error) {
            return Promise.reject(error);
        });
    }

    componentDidMount() {
        this.getApiData();
    }

    //change input type from string to number
    changeType = (newData) => {
        newData.priceRrp = newData.priceRrp ? Number(newData.priceRrp) : 0
        newData.priceShopify = newData.priceShopify ? Number(newData.priceShopify) : 0
        newData.priceAgent = newData.priceAgent ? Number(newData.priceAgent) : 0
        newData.price1212 = newData.price1212 ? Number(newData.price1212) : 0
        newData.priceSpecial = newData.priceSpecial ? Number(newData.priceSpecial) : 0
        newData.packageQty = newData.packageQty ? Number(newData.packageQty) : 0
        newData.weight = newData.weight ? Number(newData.weight) : 0
        return newData
    }

    handelAdd = (newData) => {
        if (newData.productName == null) {
            this.setState({ ifExecute: false })
            alert(" Created Unsuccessfully. Please input valid Product Name.")
        }

        if (this.state.ifExecute) {
            //change input type from string to number
            newData = this.changeType(newData)
            this.getAddApi(newData)
        }
    }

    getAddApi = (newData) => {
        axios.post("http://206.189.39.185:5031/api/Product/ProductCreate", newData)
            .then(response => {
                this.setState({ data: [...this.state.data, newData] })
                alert(" Created Successfully");
            }
            )
            .catch((error) => {
                alert(" Created Unsuccessfully. Please input valid information.");
                return error;
            })

    }

    handelUpdate = async (index, newData, oldData) => {
      
        //判断是否重新上传image
        newData.imageUrl = JSON.stringify(this.resOriginal) === '{}' ? oldData.imageUrl : this.resOriginal
        //判断是否需要delete image
        newData.imageUrl = this.deleteRes === -1 ? '' : newData.imageUrl
        newData = this.changeType(newData)
        axios.put("http://206.189.39.185:5031/api/Product/ProductUpdate", newData)
            .then(response => {
                if (response.data !== oldData) {
                    alert("Service Updated Successfully");
                    //image attribues set to original value
                    this.resOriginal = {}
                    this.deleteRes = 0
                }
                else {
                    alert("Updated Unsuccessfully");
                }
            });
    }

    handelDelete = (productId) => {
        axios.delete("http://206.189.39.185:5031/api/Product/" + productId)
            .then(response => {
                if (response.data != null) {
                    alert("Service delete Successfully");
                }
            });
    }

    //setstate to the date search time range
    searchCreatedFrom = (e) => {
        this.setState({ searchCreatedFrom: e.target.value })
    }
    searchCreatedTo = (e) => {
        this.setState({ searchCreatedTo: e.target.value })
    }

    //for "search created time range" create oldData to get previously data
    oldData = []
    handelCreatedSearch = () => {
        if (this.oldData.length === 0) {
            this.oldData = this.state.data
        }
        if(this.state.searchCreatedFrom >  this.state.searchCreatedTo){
            alert("Please select right time range.")
        }else{
            const newCreatedData = this.oldData.filter(item => item['createdAt'] >= this.state.searchCreatedFrom && item['createdAt'] <= this.state.searchCreatedTo)
            this.setState({ data: newCreatedData })
        }
    }

    showtimerangeStyle = {
        width: '300px', marginLeft: '20px', display: 'none'
    }
    noShowtimerangeStyle = {
        width: '300px', margin: '20px', Visibility: "block",
    }

    handelCreatedTimeRange = () => {
        if (this.state.showCreatedSearch) {
            this.setState({ showCreatedSearch: false })
        } else {
            this.setState({ showCreatedSearch: true })
        }
    }

    //clear the search filter
    handelCreatedClear = () => {
        this.getApiData()
    }

    //in case page rerender, just make a new variable here.
    resOriginal = {}
    //post image url to API
    getAddImageApi = (formData) => {
        axios({
            method: "post",
            url: "http://206.189.39.185:5031/api/Common/UploadImage",
            headers: {
                'Content-type': 'multipart/form-data',
            },
            data: formData,
        }).then((res) => {
            this.resOriginal = res.data
            alert("Upload Image Successful")
        })
            .catch((error) => {
                return error;
            })
    }

    //after click the image sumbit button
    onFileChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        var formData = new FormData();
        formData.append("imageFile", file, file.name);
        //check image formate and size
        if (this.handleBeforeUpload(file)) {
            this.getAddImageApi(formData)
            console.log(formData,file)
        }
    }

    // 检查照片格式、大小等信息
    handleBeforeUpload = (file) => {
        if (file) {
            const sizeOk = file.size < this.state.ImageMaxSize;
            const typeReg = new RegExp(/^image\/bmp|gif|jpg|jpeg|png$/, 'i');
            const typeOk = typeReg.test(file.type);

            if (!typeOk) {
                alert("wrong picture format")
            } else if (!sizeOk) {
                alert("Picture size over 1M ")
            }

            return sizeOk && typeOk;
        }
    }

    //make sure all input is number&alphabet
    handelFocus = (value) => {
        let testValid = /[0-9.]+$/
        // let testValid = /^(([1-9]{1}d*)|(0{1}))(.d{2})$/
        if (value !== '') {
            if (value.match(testValid)) {
                return value
            } else {
                alert("Numbers only.")
                return ""
            }
        } else {
            return ""
        }
    }

    //If img exist, click delete button to delete
    deleteRes = 0
    deleteImage = () => {
        alert("Delete Image Successful.")
        this.deleteRes = -1
    }

    downloadCsv = (data, fileName) => {
        //解决中文乱码
        var newData = "\ufeff" + data;

        const finalFileName = fileName.endsWith(".csv") ? fileName : `${fileName}.csv`;
        const a = document.createElement("a");
        a.href = URL.createObjectURL(new Blob([newData], { type: "text/csv,,charset=UTF-8'" }));
        a.setAttribute("download", finalFileName);
        a.click();
    }

    render() {

        return (
            <React.Fragment>
                <Nav />

                <div className="container-fluid" >
               

                   <MaterialTable
                        title="Product Management"
                        columns={
                            [
                                {
                                    title: 'Product Image',
                                    field: 'imageUrl',
                                    editComponent: (editProps) => (
                                        <div>
                                            <input
                                                type="file"
                                                autoFocus={true}
                                                style={{ width: "90px" }}
                                                accept="image/jpeg, image/gif, image/png, image/bmp"
                                                onChange={e => {
                                                    this.onFileChange(e);
                                                    editProps.onChange(e.target.value)
                                                }}
                                            />
                                            <button style={{ marginTop: "5px", width: "90px", display: editProps.value ? "block" : "none" }} onClick={this.deleteImage}>Delete  File</button>
                                        </div>

                                    ),
                                    render: (rowData: any) => {
                                        return (
                                            rowData.imageUrl 
                                            &&
                                            <img src={rowData.imageUrl} alt="" style={{ width: "50px", borderRadius: '50%' }} />
                                        )
                                    }
                                },
                                {
                                    title: 'Product Name', field: 'productName',
                                },
                                {
                                    title: 'Product Code', field: 'productCode',
                                    editComponent: (editProps) => (
                                        <input
                                            autoFocus={true}
                                            defaultValue={editProps.value}
                                            style={{ width: "50px" }}
                                            onChange={(e) => {
                                                editProps.onChange(e.target.value = this.handelFocus(e.target.value))
                                            }
                                            }
                                        />
                                    )
                                },
                                {
                                    title: 'PRP Price', field: 'priceRrp',
                                    editComponent: (editProps) => (

                                        <input
                                            autoFocus={true}
                                            style={{ width: "50px" }}
                                            defaultValue={editProps.value}
                                            onChange={(e) => {
                                                editProps.onChange(e.target.value = this.handelFocus(e.target.value))
                                            }
                                            }
                                        />
                                    )
                                },
                                {
                                    title: 'Shopify Price', field: 'priceShopify',
                                    editComponent: (editProps) => (
                                        <input
                                            autoFocus={true}
                                            style={{ width: "50px" }}
                                            defaultValue={editProps.value}
                                            onChange={(e) => {
                                                editProps.onChange(e.target.value = this.handelFocus(e.target.value))
                                            }
                                            }
                                        />
                                    )
                                },
                                {
                                    title: 'Agent Price', field: 'priceAgent',
                                    editComponent: (editProps) => (
                                        <input
                                            autoFocus={true}
                                            style={{ width: "50px" }}
                                            defaultValue={editProps.value}
                                            onChange={(e) => {
                                                editProps.onChange(e.target.value = this.handelFocus(e.target.value))
                                            }
                                            }
                                        />
                                    )
                                },
                                {
                                    title: 'Other Price', field: 'price1212',
                                    editComponent: (editProps) => (
                                        <input
                                            autoFocus={true}
                                            style={{ width: "50px" }}
                                            defaultValue={editProps.value}
                                            onChange={(e) => {
                                                editProps.onChange(e.target.value = this.handelFocus(e.target.value))
                                            }
                                            }
                                        />
                                    )
                                },
                                {
                                    title: 'Special Price', field: 'priceSpecial',
                                    editComponent: (editProps) => (
                                        <input
                                            autoFocus={true}
                                            style={{ width: "50px" }}
                                            defaultValue={editProps.value}
                                            onChange={(e) => {
                                                editProps.onChange(e.target.value = this.handelFocus(e.target.value))
                                            }
                                            }
                                        />
                                    )
                                },
                                {
                                    title: 'Weight(KG)', field: 'weight',
                                    editComponent: (editProps) => (
                                        <input
                                            autoFocus={true}
                                            style={{ width: "50px" }}
                                            defaultValue={editProps.value}
                                            onChange={(e) => {
                                                editProps.onChange(e.target.value = this.handelFocus(e.target.value))
                                            }
                                            }
                                        />
                                    )
                                },
                                {
                                    title: 'Package Quantity', field: 'packageQty',
                                    editComponent: (editProps) => (
                                        <input
                                            autoFocus={true}
                                            style={{ width: "50px" }}
                                            defaultValue={editProps.value}
                                            onChange={(e) => {
                                                editProps.onChange(e.target.value = this.handelFocus(e.target.value))
                                            }
                                            }
                                        />
                                    )
                                },
                                { title: 'Created Time', field: 'createdAt', type: 'date' }
                            ]
                        }

                        data={this.state.data}

                        components={{
                            Toolbar: props => {
                                const propsCopy = { ...props }
                                return (
                                    <div>
                                        <MTableToolbar {...propsCopy} />
                                        <div>
                                            <button type="button" className="btn btn-info" onClick={this.handelCreatedTimeRange}>Limited Created Time </button>
                                            {/* limited created time  */}

                                            <div style={this.state.showCreatedSearch ? this.noShowtimerangeStyle : this.showtimerangeStyle} id="timeRange">
                                                <h4>Created Time Range</h4>
                                                <label htmlFor="search">From: </label>
                                                <input id="search" onChange={e => this.searchCreatedFrom(e)} type="date" className="form-control" value={this.state.searchCreatedFrom} />
                                                <label htmlFor="search">To: </label>
                                                <input id="search" onChange={this.searchCreatedTo} type="date" className="form-control" value={this.state.searchCreatedTo}/>
                                                <button className="btn btn-info" onClick={this.handelCreatedSearch}>Search</button>
                                                <button className="btn btn-info" onClick={this.handelCreatedClear}>Clear</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            },
                        }}

                        options={{
                            addRowPosition: 'first',
                            //   maxBodyHeight: '500px',
                            showEmptyDataSourceMessage: false,
                            actionsColumnIndex: -1,
                            rowStyle: {
                                fontSize: "13px",
                            },
                            toolbarButtonAlignment: "right",
                            filtering: true,
                            initialPage: 0,
                            exportButton: {
                                csv: true,
                                pdf: false
                            },

                         //   review img and createAt format
                            exportCsv: (columns, data) => {
                                // Turn headers into array of strings
                                const headerRow = columns.map(col => {
                                      return col.title;
                                });
                               
                                const newHeaderRow = headerRow.filter( i => i !== "Product Image")
                                const dataRows = data.map(({ data, ...row }) => Object.values(row));
                                

                                let newData:Array<any> = []
                              
                                //select columns can be exported  
                                 newData =dataRows.map( i =>[i[2],i[1],i[13],i[14],i[15],i[16],i[17],i[10],i[11],i[8]])
                                 //change "created date" format
                                for(let i=0;i<newData.length;i++){
                                    const a = newData[i][9].toString()
                                    newData[i][9] = a.substring(0,10)
                                }
                                const delimiter = ",";
                                const csvContent = [newHeaderRow, ...newData].map(e => e.join(delimiter)).join("\n");
 
                                const csvFileName = "Product Management";  
                                
                                this.downloadCsv(csvContent, csvFileName);
                            },                       
                            search: true,
                            pageSize: this.state.pageSize,
                            headerStyle: {
                                position: "sticky",
                                top: 0,
                                fontSize: "14px",
                            },
                        }}

                        editable={{
                            onBulkUpdate: changes =>
                                new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        resolve("");
                                    }, 1000);
                                }),
                            onRowAdd:
                                (newData: any) =>
                                    new Promise((resolve, reject) => {


                                        setTimeout(() => {
                                            this.handelAdd(newData)
                                            // this.setState({ data: [...this.state.data, newData] });
                                            resolve("");
                                        }, 1000)
                                    }
                                    ),
                            onRowUpdate: (newData, oldData) =>

                                new Promise((resolve, reject) => {

                                    setTimeout(() => {

                                        const dataUpdate: any = [...this.state.data];
                                        const index = oldData.tableData.id;
                                        dataUpdate[index] = newData;

                                        this.handelUpdate(index, newData, oldData)
                                        this.setState({ data: dataUpdate });

                                        resolve("");
                                    }, 1000)
                                }),
                            onRowDelete: oldData =>
                                new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        const dataDelete = [...this.state.data];
                                        const index = oldData.tableData.id;
                                        dataDelete.splice(index, 1);

                                        this.handelDelete(oldData.productId)
                                        this.setState({ data: [...dataDelete] });

                                        resolve("")
                                    }, 1000)
                                })
                        }}
                    /> 
                </div>
            </React.Fragment>
        );
    }
}

export default ProductManager;
