import mongoose from "mongoose"

const complaintSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        department: {
            type: String,
            required: true,
        },
        incident: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Complaint", complaintSchema);


// [
//     {
//       name: "Rahul Singh",
//       department: "Electrical Engineering",
//       incident: "I was stopped outside the hostel and forced to dance by a group of seniors. Though no physical harm was done, it was mentally disturbing."
//     },
//     {
//       name: "Anjali Verma",
//       department: "Computer Science",
//       incident: "A senior made me introduce myself in an insulting manner in front of the whole class. It was humiliating and made me uncomfortable attending lectures."
//     },
//     {
//       name: "Mohammad Faiz",
//       department: "Mechanical Engineering",
//       incident: "During the lunch break, two seniors took my ID card and refused to return it unless I bought them snacks. This was clearly an act of ragging."
//     },
//     {
//       name: "Pooja Sharma",
//       department: "Civil Engineering",
//       incident: "In the lab, some seniors passed rude comments and forced me to clean their workstation. This is creating fear and anxiety during lab sessions."
//     },
//     {
//       name: "Vikram Yadav",
//       department: "Automobile Engineering",
//       incident: "I was called to the seniors' room and made to do 50 sit-ups as a ‘welcome ritual’. I felt embarrassed and mentally stressed."
//     }
//   ]
  