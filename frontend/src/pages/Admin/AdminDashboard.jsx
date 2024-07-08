import Chart from "react-apexcharts";
import { useGetAllUsersQuery } from "../../redux/api/userApiSlice";
import {
	useFetchTotalAmountOrdersQuery,
	useFetchTotalSalesQuery,
	useFetchSalesByDateQuery,
} from "../../redux/api/orderApiSlice";
import { useState, useEffect } from "react";
import AdminMenu from "../../components/AdminMenu";
import OrderList from "./OrderList";
import Loader from "../../components/Loader";

function AdminDashboard() {
	const { data: users, isLoading: usersLoading } =
		useGetAllUsersQuery();
	const { data: sales, isLoading: salesLoading } =
		useFetchTotalSalesQuery();
	const { data: salesByDate, isLoading: salesByDateLoading } =
		useFetchSalesByDateQuery();
	const { data: orders, isLoading: ordersLoading } =
    useFetchTotalAmountOrdersQuery();

	const [chart, setChart] = useState({
		options: {
			chart: {
				type: "line",
			},
			tooltip: {
				theme: "dark",
			},
			colors: ["#00E396"],
			dataLabels: {
				enabled: true,
			},
			stroke: {
				curve: "smooth",
			},
			title: {
				text: "Sales Trend",
				align: "left",
			},
			grid: {
				borderColor: "#ccc",
			},
			markers: {
				size: 1,
			},
			xaxis: {
				categories: [],
				title: {
					text: "Date",
				},
			},
			yaxis: {
				title: {
					text: "Sales",
				},
				min: 0,
			},
			legend: {
				position: "top",
				horizontalAlign: "right",
				floating: true,
				offsetX: -5,
				offsetY: -25,
			},
		},
		series: [{ name: "Sales", data: [] }],
	});

    useEffect(() => {
        if (salesByDate) {
            const formatedSalesDate = salesByDate.map(item => ({
                x: item._id,
                y: item.totalSales
            }))

            setChart((prevState) => ({
                ...prevState,
                options: {
                    ...prevState.options,
                    xaxis: {
                        categories: formatedSalesDate.map(item => item.x)
                    }
                },
                series: [
                    {name: "Sales", data: formatedSalesDate.map(item => item.y)}
                ]
            }))
        }
    }, [salesByDate])

    return (
        <>
            <AdminMenu />

            <section className="xl:ml-[4rem] md:ml-[0]">
                <div className="w-[80%] flex justify-around flex-wrap mx-auto">
                    {/* Sales */}
                    <div className="rounded-lg bg-black p-5 w-[20rem] mt-5">
                        <div className="font-bold rounded-full w-[3rem] bg-pink-500 text-center p-3">
                            $
                        </div>
                        <p className="mt-5">Sales</p>
                        <h1 className="text-2xl font-bold">
                            $ {salesLoading ? <Loader/> : sales.totalSales.toFixed(2)}
                        </h1>
                    </div>

                    {/* Customer */}
                    <div className="rounded-lg bg-black p-5 w-[20rem] mt-5">
                        <div className="font-bold rounded-full w-[3rem] bg-pink-500 text-center p-3">
                            $
                        </div>
                        <p className="mt-5">Customers</p>
                        <h1 className="text-2xl font-bold">
                            {usersLoading ? <Loader/> : users.users.length}
                        </h1>
                    </div>

                    {/* Order */}
                    <div className="rounded-lg bg-black p-5 w-[20rem] mt-5">
                        <div className="font-bold rounded-full w-[3rem] bg-pink-500 text-center p-3">
                            $
                        </div>
                        <p className="mt-5">Orders</p>
                        <h1 className="text-2xl font-bold">
                            {ordersLoading ? <Loader/> : orders.totalCount}
                        </h1>
                    </div>
                </div>

                <div className="mt-[4rem] ml-[15rem]">
                    <Chart options={chart.options} series={chart.series} type="bar" width="70%"/>
                </div>

                <div className="mt-[4rem]">
                    <OrderList />
                </div>
            </section>
        </>
    )
}

export default AdminDashboard;
