import prisma from "../../../lib/prisma_object"
//CREATE USER
export async function createUser(name:string , username:string, phone:string, email:string, photoURL?: string , id?: string):Promise<string|undefined>{
    let result:{ id: string };
    try{
        await prisma.$connect();
        let userCheck = await prisma.user.findFirst({
            where:{
                username: username
            }
        });
        if(userCheck) return "user exists";
        if(photoURL && id){
            result = await prisma.user.create({
                data:{
                    id: id,
                    name: name,
                    username: username,
                    phone: '09-1234567',
                    email: email,
                    profile:{
                        create:{
                            url: photoURL
                        }
                    }

                },
                select:{
                    id: true
                }
            })
            return result.id;
        }
        result = await prisma.user.create({
            data:{
                name: name,
                username: username,
                phone: '09-1234567',
                email: email
            },
            select:{
                id: true
            }
        })
        return result.id;
    } catch(error){
        if(error) return "error";
    }
};
export async function readUserbyID(id: string){
    try{
        await prisma.$connect();
        let result = await prisma.user.findFirst({
            where: {
                id: id
            },
            select:{
                id: true,
                name: true,
                username: true,
                email: true,
                phone: true,
                posts:{
                    select:{
                        categories:{
                            select:{
                                name: true
                            }
                        }
                    }
                },
                _count:{
                    select:{
                        posts: true,
                        comments: true,
                        reactions: true
                    }
                },
                categories: {
                    select:{
                        name: true
                    }
                },
                profile: {
                    select:{
                        url: true
                    }
                }
            }
        })
        return result;
    } catch(error){
        return "error";
    }
}
export async function readUserbyUsername(username: string){
    let result:{ name: string; username: string; phone: string; email: string; _count: { posts: number; }; } | null;
    try{
        await prisma.$connect();
        result = await prisma.user.findFirst({
            where: {
                username: username
            },
            select:{
                id: true,
                name: true,
                username: true,
                email: true,
                phone: true,
                posts:{
                    select:{
                        categories:{
                            select:{
                                name: true
                            }
                        }
                    }
                },
                _count:{
                    select:{
                        posts: true,
                        comments: true,
                        reactions: true
                    }
                }
            }
        })
        return result;
    } catch(error){
        return "error";
    }
}
export async function readUserbyEmail(email: string){
    try{
        await prisma.$connect();
        let result = await prisma.user.findFirst({
            where:{
                email: email
            }
        });
        return result;
    } catch(err){
        return 'error';
    }
}
//UPDATING USER DATA
export async function updateEmail(username: string, email:string){
    try{
        await prisma.$connect();
        await prisma.user.update({
            where: {
                username: username
            },
            data:{
                email: email
            }
        })
        return "email updated";
    } catch(error){
        if(error) return "error";
    }
}
export async function updatePhone(username: string, phone:string){
    try{
        await prisma.$connect();
        await prisma.user.update({
            where: {
                username: username
            },
            data:{
                phone: phone
            }
        })
        return "phone updated";
    } catch(error){
        if(error) return "error";
    }
}
export async function updateName(id: string, name:string){
    try{
        await prisma.$connect();
        await prisma.user.update({
            where: {
                id: id
            },
            data:{
                name: name
            }
        })
        return "name updated";
    } catch(error){
        if(error) return "error";
    }
}
export async function updateUsername(id: string, username:string){
    try{
        await prisma.$connect();
        await prisma.user.update({
            where:{
                id: id
            },
            data:{
                username: username
            }
        })
        return 'Username updated';
    } catch(err){
        if(err) return 'error';
    }
}
//Add interested categories
export async function addCategoryToUser(id: string , category: string){
    try{
        await prisma.$connect();
        await prisma.user.update({
            where: {
                id: id
            },
            data:{
                categories:{
                    connect:{
                        name: category
                    }
                }
            }
        })
        return 'added';
    }
    catch(err){
        return 'error';
    }
}
//Remove interested categories
export async function removeCategoryFromUser(id: string , category: string){
    try{
        await prisma.$connect();
        await prisma.user.update({
            where: {
                id: id
            },
            data:{
                categories:{
                    disconnect:{
                        name: category
                    }
                }
            }
        })
        return 'added';
    }
    catch(err){
        return 'error';
    }
}
//DELETING USER
export async function deleteUser(id: string){
    try{
        await prisma.$connect();
        let user = await readUserbyID(id);
        if(user !== null && typeof user !== 'string'){
            if(user.profile !== null){
                await prisma.profileImg.delete({
                    where:{
                        userID: id
                    }
                });
            }
        }
        await prisma.user.delete({
            where: {
                id: id
            }
        });
        return 'done';
    } catch(error){
        return "error";
    }
}
//npx tsc server/prisma_methods/users/CRUD.ts