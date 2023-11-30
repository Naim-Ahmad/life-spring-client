import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Chip,
    Tooltip,
    Typography,
} from "@material-tailwind/react";
import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';
   
  export default function ProfileCard({data:doctor}) {
    const {profileImage, name, about, specialist } = doctor
    return (
      <Card>
        <CardHeader floated={false} className="h-80">
          <img src={profileImage} alt="profile-picture"/>
        </CardHeader>
        <CardBody className="text-center">
          <Typography variant="h4" color="blue-gray" className="mb-2">
           {name}  <Chip variant="outlined" color="green" value={specialist} className="text-white w-fit rounded-2xl bg-green-500 mx-auto my-3" />
          </Typography>
          <Typography color="blue-gray" className="font-medium" textGradient>
            {about}
          </Typography>
        </CardBody>
        <CardFooter className="flex justify-center gap-7 pt-2">
          <Tooltip content="Like">
            <Typography
              variant="lead"
              color="blue"
            >
              <FaFacebook size={30}/>
            </Typography>
          </Tooltip>
          <Tooltip content="Follow">
            <Typography
              variant="lead"
              color="light-blue"
            >
              <FaTwitter size={30} />
            </Typography>
          </Tooltip>
          <Tooltip content="Follow">
          <Typography
              variant="lead"
              color="light-blue"
            >
              <FaLinkedin size={30}/>
            </Typography>
          </Tooltip>
        </CardFooter>
      </Card>
    );
  }