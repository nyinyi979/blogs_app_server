//CREATE PUBLISH UPDATE DELETE
import prisma from "../../../lib/prisma_object"
//CREATING && DELETING blog
export async function createBlog(id: string, title: string, content: string,  category: any[]):Promise<String|undefined>{
    //utilizing try catch block for any error
    try {
        await prisma.$connect();
        let userCheck:{username: string}|null = await prisma.user.findFirst({
            where: {
                id: id
            },
            select: {
                username: true
            }
        });
        if(userCheck === null) return "error";
    //create the post first
        let result:{ id: string; } = await prisma.post.create({
            data: {
                title: title,
                content: content,
                author: {
                    connect: {
                        username: userCheck.username
                    }
                }
            },
            select:{
                id: true
            }
        });
    //search the category existence, if not create a category and update it 
    //sicne category is an array , it is done this way
        let i = 0;
        while(i<category.length){
            await prisma.post.update({
                where: {
                    id: result.id
                },
                data:{
                    categories:{
                        connectOrCreate: {
                            where:{
                                name: category[i]
                            },
                            create:{
                                name: category[i]
                            }
                        }
                    }
                }
            })
            i++;
        }
        return result.id;
    } catch (error) {
        if(error) return "error";
    }
}


export async function deleteBlog(id: string):Promise<String>{
    try {
        await prisma.$connect();
        await prisma.post.delete({
            where: {
                id: id
            }
        })
        return "deleted";
    } catch (error) {
        if(error) return "error";
    }
    return "DELETION DONE";
}

//Publish
export async function Publish(id: string){
    try {
    await prisma.$connect();
        await prisma.post.update({
            where: {
                id: id
            },
            data:{
                published: true
            }
        })
        return "PUBLISHED DONE";
    } catch (error) {
        if(error) return "error";
    }
}
//UnPublish 
export async function UnPublish(id: string){
    try {
        await prisma.$connect();
            await prisma.post.update({
                where: {
                    id: id
                },
                data:{
                    published: false
                }
            })
            return "PUBLISHED DONE";
        } catch (error) {
            if(error) return "error";
        }
}
//npx tsc server/prisma_methods/blogs/CPD.ts