const users = [{
    id:1,
    name:'alberto',
    schoolId : 101
},{
    id:2,
    name:'luca',
    schoolId : 999
}];

const grades = [{
    id:1,
    schoolId:101,
    grade:86
},{
    id:2,
    schoolId:999,
    grade:100
},{
    id:3,
    schoolId:101,
    grade:80
}];

const getUser = (id) => {
    return new Promise((resolve,reject)=>{
        const user = users.find(u => u.id == id);
        if (user) {
            resolve(user);
        } else {
            reject(`Unable to find user with id : ${id}`);
        }
    })
};

const getGrades = (schoolId) => {
    return new Promise((resolve,reject)=>{
        resolve(grades.filter(g => g.schoolId == schoolId));
    })
};

const getStatus = (userId) => {
    let user;
    return getUser(userId)
    .then(tempUser => {
        user = tempUser;
        return getGrades(user.schoolId)
    }).then((grades)=>{
        let average = 0;
        if (grades.length > 0) {
            average = grades.map((grade) => grade.grade).reduce((a,b)=> a + b) / grades.length;
        }
        return `${user.name} has a ${average}% in the class.`;
        console.log(average);
    })
};

getStatusAsync = async (userId) => {
    const user = await getUser(userId);
    const grades = await getGrades(user.schoolId);
 
    let average = 0;
    if (grades.length > 0) {
        average = grades.map((grade) => grade.grade).reduce((a,b)=> a + b) / grades.length;
    }
    return `${user.name} has a ${average}% in the class.`;
}

getStatusAsync(1).then((res)=>console.log(res)).catch((e)=>console.log(e));
