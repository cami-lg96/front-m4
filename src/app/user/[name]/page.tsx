
import UserDashboard from "@/views/Dashboard/Dashboard"

const DashboardPage = ({ params }: { params: { name: string } }) => {

    return (
         <div className=' p-4 m-4'>
            <h1 className=' p-4 m-4 text-2xl flex justify-center items-center'>Welcome {params.name}!</h1>
            <UserDashboard />       
        </div>
        
    );
};

export default DashboardPage;
