import { dropbox } from "../../dropbox/dropbox";
import prisma from "../../../lib/prisma_object"
//Image ADDING && REMOVING
export async function addImage(postID: string, imgData: string, imgLocation: string){
    try {
        await prisma.$connect();
        let existing_img:{ images: { location: string; }[]; } | null = await prisma.post.findFirst({
            where: {
                id: postID
            },
            select:{
                images:{
                    select:{
                        location: true
                    }
                }
            }
        });
        if(existing_img){
            for(let i = 0; i<existing_img.images.length; i++){
                if(existing_img.images[i].location === imgLocation){
                    return "Image already exists on that location";
                }
            }
        }
        let result = await prisma.post.update({
            where: {
                id: postID
            },
            data:{
                images:{
                    create:{
                        url: imgData,
                        location: imgLocation
                    }
                }
            },
            select:{
                images:{
                    select:{
                        url: true,
                        location: true
                    }
                }
            }
        });
        await prisma.post.update({
            where:{
                id: postID
            },
            data:{
                modifiedAt: new Date()
            }
        })
        return result.images[0];
    } catch(error){
        if(error) return "error";
    }
    return "Still an error";
}
export async function removeImage(imgURL: string){
    try{
        dropbox.filesDeleteV2({
            path: imgURL
        })
        await prisma.$connect();
        await prisma.image.delete({
            where:{
                url: imgURL
            }
        });
        return "image removed";
    } catch( error ){
        return "error";
    }
}


//Updating title and content
export async function updateTitleAndContent(id: string, title: string, content: string){
    try{
        await prisma.post.update({
            where: {
                id: id
            },
            data: {
                title: title
            }
        });
        await prisma.post.update({
            where: {
                id: id
            },
            data: {
                content: content
            }
        });
        await prisma.post.update({
            where:{
                id: id
            },
            data:{
                modifiedAt: new Date()
            }
        });
        return "Done";
    } catch(err){
        return "error";
    }
}


//Category ADDING && REMOVING
export async function addCategory(id: string, category: string){
    try{
        await prisma.$connect();
        await prisma.post.update({
            where: { 
                id: id
            },
            data:{
                categories: {
                    connectOrCreate: {
                        where: {
                            name: category
                        },
                        create: {
                            name: category
                        }
                    }
                }
            }
        })
        await prisma.post.update({
            where:{
                id: id
            },
            data:{
                modifiedAt: new Date()
            }
        })
        return "category added";
    } catch(error){
        if(error) return "error";
    }
}

export async function removeCategory(id: string, category: string):Promise<string|undefined>{
    try{
        await prisma.$connect();
        await prisma.post.update({
            where: { 
                id: id
            },
            data:{
                categories: {
                    disconnect: {
                        name: category
                    }
                }
            }
        })
        await prisma.post.update({
            where:{
                id: id
            },
            data:{
                modifiedAt: new Date()
            }
        })
        return "removed";
    } catch(error){
        if(error) return "error";
    }
}

//Adding Like and REMOVING 
export async function addLike(postID: string, username: string){
    try{
        let existing_user = await prisma.reaction.findFirst({
            where: {
                postID: postID,
                reactor: {
                    every:{
                        username: username
                    }
                }
            },
            select:{
                id: true
            }
        });
        if(existing_user) return "already given";
        await prisma.$connect();
        let result:{ id:Number } = await prisma.reaction.create({
            data:{
                post:{
                    connect:{
                        id: postID
                    }
                },
                reactor:{
                    connect:{
                        username: username
                    }
                }
            },
            select:{
                id: true
            }
        })
        return result.id;
    } catch(error){
        if(error) return "error";
    }
}
export async function removeLike(reactionID: number){
    try{
        await prisma.$connect();
        await prisma.reaction.deleteMany({
            where:{ 
                id: reactionID
            }
        });
        return "removed";
    } catch(error){ 
        if(error) return "error";
    }
}

//Comments ADDING && REMOVING
export async function addComment(postID: string , CMTContent: string , username: string){
    try{
        await prisma.$connect();
        let result = await prisma.post.update({
            where: {
                id: postID
            },
            data:{
                comments:{
                    create:{
                        content: CMTContent,
                        commentedBy: {
                            connect: {
                                username: username 
                            }
                        },
                        
                    }
                }
            },
            select:{
                comments:{
                    select:{
                        id: true
                    }
                }
            }
        })
        return result.comments[0].id;
    } catch(error){
        if(error) return "error";
    }
}
export async function removeComment(postID: string , cmtID: number){
    try{
        await prisma.$connect();
        await prisma.comment.delete({
            where: {
                postID: postID,
                id: cmtID
            }
        })
        return "comment removed";
    } catch(error){
        if(error) return "error";
    }
}
//npx tsc server/prisma_methods/blogs/update.ts
