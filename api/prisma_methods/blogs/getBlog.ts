//THIS FILE IS USED WHEN INDIVIDUAL BLOG IS RENDERED
import prisma from "../../../lib/prisma_object"
export async function getBlog(id: any){
    await prisma.$connect();
    try{
        let result:object|null = await prisma.post.findFirst({
            where: {
                id: id,
                published: true
            },
            select: {
                id: true,
                title: true , 
                content: true , 
                author: {
                    select:{
                        name: true
                    }
                },
                createdAt: true,
                categories: {
                    select:{
                        name: true
                    }
                },
                images:{
                    select:{
                        url: true,
                        location: true
                    }
                },
                comments:{
                    select:{
                        commentedBy: {
                            select:{
                                name: true
                            }
                        },
                        content: true
                    }
                },
                _count:{
                    select:{
                        reactions: true,
                        comments: true
                    }
                }
            }
        });
    return result;
    } catch(err){
        return "error";
    }
}

//it is for edition, it can be either published or not
export async function getBlog_P(id: any){
    await prisma.$connect();
    try{
        let result:object|null = await prisma.post.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                title: true , 
                content: true , 
                author: {
                    select:{
                        username: true
                    }
                },
                createdAt: true,
                categories: {
                    select:{
                        name: true
                    }
                },
                images:{
                    select:{
                        url: true,
                        location: true
                    }
                },
                comments:{
                    select:{
                        commentedBy: {
                            select:{
                                name: true,
                                username: true
                            }
                        },
                        content: true
                    }
                },
                _count:{
                    select:{
                        reactions: true,
                        comments: true
                    }
                },
                modifiedAt: true,
                published: true
            }
        });
    return result;
    } catch(err){
        return "error";
    }
}
//npx tsc api/prisma_methods/blogs/getBlog.ts