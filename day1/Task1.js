//User data
const usersDatabase = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Alice Johnson" }
];

//tasks data
const tasksDatabase = [
    { userId: 1, task: "Write code" },
    { userId: 1, task: "Review PRs" },
    { userId: 2, task: "Update documentation" }
];

//implement the solution using Callbacks

function fetchUser_Callback(userId, callback){
    setTimeout(()=> {
        const user = usersDatabase.find(u => u.id === userId);
        if (user){
            callback(null, user);
        }else{
            callback(`User with ID ${userId} not found`, null);
        }
    },1000);
}

function fetchTasks_Callback(userId, callback){
    setTimeout(()=>{
        const tasks =tasksDatabase.filter(task => task.userId === userId);

        if(tasks.length >0){
            callback(null, tasks);
        }else{
            callback(`No tasks found for user ID ${userId}`, null);
        }
    },1000);
}

// implement the solution using promises
function fetchUser_Promises(userId){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            const user = usersDatabase.find(u => u.id === userId);

            if (user){
                resolve(user);
            }else{
                reject(`User with ID ${userId} not found`);
            }
        },1000);
    });
}

function fetchTasks_promises(userId){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            const tasks =tasksDatabase.filter(task => task.userId === userId);

            if(tasks.length >0){
                resolve(tasks);
            }else{
                reject(`No tasks found for user ID ${userId}`);
            }
        },1000);
    });
}


//implement the solution using async/await
async function fetchUser_Async(userId) {
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            const user = usersDatabase.find(u => u.id === userId);

            if(user){
                resolve(user);
            }else{
                reject(`User with ID ${userId} not found`);
            }
        },1000);
    });
}

async function fetchTasks_Async(userId) {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            const tasks =tasksDatabase.filter(task => task.userId === userId);

            if(tasks.length>0){
                resolve(tasks);
            }else{
                reject(`No tasks found for user ID ${userId}`);
            }
        },1000);
    });
    
}

//callbacks

fetchUser_Callback(1, (error, user)=>{
    if(error){
        console.error(error);
    }else{
        console.log('User fetched with Callback:', user);
        fetchTasks_Callback(user.id, (error, tasks)=>{
            if(error){
                console.error(error);
            }else{
                console.log('Tasks fetched with Callback:', tasks);
            }
        });
    }
});


//Promises
fetchUser_Promises(2)
.then(user =>{
    console.log('User fetched with Promise:', user);
    return fetchTasks_promises(user.id);
})
.then(tasks =>{
    console.log('Tasks fetched with Promise:', tasks);
})
.catch(error =>{
    console.error(error);
});

// Async/await
(async ()=>{
    try{
        const user = await fetchUser_Async(3);
        console.log('User fetched with Async/Await:', user);
        const tasks = await fetchTasks_Async(user.id);
        console.log('Tasks fetched with Async/Await:', tasks);
    }catch(error){
        console.error(error);

    }
})();


