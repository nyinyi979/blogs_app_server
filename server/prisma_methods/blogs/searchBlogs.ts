//THIS FILE IS USED FOR MULTIPLE ITEMS FETCHING
import prisma from "../../../lib/prisma_object"
export async function blogsByAuthor(author: string, blogsNumber: number, skip:number){
    try{
        await prisma.$connect();
        let result = await prisma.post.findMany({
            where: {
                author: {
                    every:{
                        username: author
                    }
                },
                published: true
            },
            select: {
                id: true,
                title: true,
                content: true,
                categories:{
                    select:{
                        name: true
                    }
                },
                author:{
                    select:{
                        username: true
                    }
                },
                images:{
                    select:{
                        url: true,
                        location: true
                    }
                },
                _count: {
                  select: {
                    reactions: true,
                    comments: true
                  }  
                },
                createdAt: true,
            },
            take: blogsNumber,
            skip: skip
        });
        return result;
    } catch(error) {
        if(error) return "error";
    }
}

//blogs by author ID, will include not published posts!!! FOR EDITION AND PUBLISHMENT
export async function blogsByAuthorID(authorID: string , blogsNumber: number, skip:number, sort:'asc'|'desc'){
    try{
        await prisma.$connect();
        let result = await prisma.post.findMany({
            where: {
                author: {
                    every:{
                        id: authorID
                    }
                }
            },
            select: {
                id: true,
                title: true,
                content: true,
                categories:{
                    select:{
                        name: true
                    }
                },
                author:{
                    select:{
                        name: true,
                        categories: true,
                        profile: {
                            select:{
                                url: true
                            }
                        },
                        _count:{
                            select:{
                                posts: true
                            }
                        }
                    }
                },
                modifiedAt: true,
                images:{
                    select:{
                        url: true,
                        location: true
                    }
                },
                _count: {
                  select: {
                    reactions: true,
                    comments: true
                  }  
                },
                createdAt: true,
                published: true
            },
            take: blogsNumber,
            skip: skip,
            orderBy:{
                published: sort
            }
        });
        return result;
    } catch(error) {
        if(error) return "error";
    }
}

//blogs by category
export async function blogsByCategory(category: string, blogsNumber: number, skip: number){
    try{
        await prisma.$connect();
        let result = await prisma.post.findMany({
            where: {
                categories:{
                    some:{
                        name: category
                    }
                },
                published: true
            },
            select: {
                id: true,
                title: true,
                content: true,
                categories:{
                    select:{
                        name: true
                    }
                },
                author:{
                    select:{
                        username: true
                    }
                },
                images:{
                    select:{
                        url: true,
                        location: true
                    }
                },
                _count: {
                  select: {
                    reactions: true,
                    comments: true
                  }  
                },
                createdAt: true,
            },
            take: blogsNumber,
            skip: skip
        });
        return result;
    } catch(error) {
        if(error) return "error";
    }
}
//blogs by categories 
export async function blogsByCategories(category: {name: string}[], take: number , skip: number){
    try{
        await prisma.$connect();
        let result:any[] = [];
        for(let i =0; i<category.length; i++){
            let post = await prisma.post.findMany({
                where:{
                    categories: {
                        some: {
                            name: category[i].name
                        }
                    }
                },
                select: {
                    id: true,
                    title: true,
                    content: true,
                    categories:{
                        select:{
                            name: true
                        }
                    },
                    author:{
                        select:{
                            username: true
                        }
                    },
                    images:{
                        select:{
                            url: true,
                            location: true
                        }
                    },
                    _count: {
                      select: {
                        reactions: true,
                        comments: true
                      }  
                    },
                    createdAt: true,
                },
                take: take,
                skip: skip
            })
            if(post && post.length !==0){
                post.map((value)=>{
                    result.push(value);
                })
            }
        }
        return result;
    } catch(error) {
        if(error) return "error";
    }
}
export function addDays(date:Date, days:number) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}
export async function blogsByDate(date: Date, blogsNumber: number, skip: number){
    try{
        let tomorrow = addDays(date , 1);
        await prisma.$connect();
        let result = await prisma.post.findMany({
            where: {
                createdAt: {
                    gte: date,
                    lt: tomorrow
                },
                published: true
            },
            select: {
                id: true,
                title: true,
                content: true,
                categories:{
                    select:{
                        name: true
                    }
                },
                author:{
                    select:{
                        username: true
                    }
                },
                images:{
                    select:{
                        url: true,
                        location: true
                    }
                },
                _count: {
                  select: {
                    reactions: true,
                    comments: true
                  }  
                },
                createdAt: true,
            },
            take: blogsNumber,
            skip: skip
        });
        return result;
    } catch(error) {
        if(error) return "error";
    }
}

//npx tsc server/prisma_methods/blogs/searchBlogs.ts