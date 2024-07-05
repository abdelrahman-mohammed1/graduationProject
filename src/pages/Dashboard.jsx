import { HiOutlineBriefcase, HiOutlineUsers } from "react-icons/hi2";
import { FaCity } from "react-icons/fa";
import { FaUserNurse } from "react-icons/fa6";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Stat from "../ui/Stat";
import Spinner from '../ui/Spinner'
import { useData } from "../context/useDate";
import MyScatterChart from '../ui/SalesChart'




function Dashboard() {



  const { data, users, nurses, loadingBooking, loading, bookings, getNurseLoading } = useData();
  const cityNumber = data?.data?.length;
  const nursesNumber = nurses?.length;
  const usersNumber = users?.length
  const bookingsNumber = bookings?.data?.length
  return (
    <>
      {
        loading || loadingBooking || getNurseLoading
          ?
          <Spinner />
          :
          <Row type="vertical">
            <Heading as="h1">Dashboard</Heading>
            <Row type="horizontal" >
              <Stat title='Bookings' color='blue' icon={<HiOutlineBriefcase />} value={bookingsNumber} />
              <Stat title='Users' color='green' icon={<HiOutlineUsers />} value={usersNumber} />
              <Stat title='Nurses' color='indigo' icon={<FaUserNurse />} value={nursesNumber} />
              <Stat title='Cities' color='yellow' icon={<FaCity />} value={cityNumber} />
            </Row>
            <MyScatterChart />


          </Row>
      }
    </>
  )
}

export default Dashboard;
