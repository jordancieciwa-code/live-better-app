"use server";
import {revalidatePath} from "next/cache";
import {requireStudioAccess,serverClient} from "@/lib/auth/server";
import {validateCampaign,validateContent} from "./validation";
import type {Campaign,ContentItem} from "./types";

type Result={ok:boolean;message:string};
const denied:Result={ok:false,message:"Not authorized to edit studio content."};
const validId=(id:string)=>/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);

export async function saveContent(item:ContentItem):Promise<Result>{
 if(!(await requireStudioAccess()))return denied;
 const error=validateContent(item);
 if(error)return {ok:false,message:error};
 if(item.id&&!validId(item.id))return {ok:false,message:"Invalid content identifier."};
 const db=await serverClient();
 const row={title:item.title.trim(),kind:item.kind,pillar:item.pillar,description:item.description.trim(),url:item.url.trim(),status:item.status};
 const result=item.id?await db.from("studio_content").update(row).eq("id",item.id).select("id").single():await db.from("studio_content").insert(row).select("id").single();
 if(result.error)return {ok:false,message:"Could not save content. Please retry."};
 revalidatePath("/studio");return {ok:true,message:"Content saved."};
}
export async function saveCampaign(item:Campaign):Promise<Result>{
 if(!(await requireStudioAccess()))return denied;
 const error=validateCampaign(item);
 if(error)return {ok:false,message:error};
 if(item.id&&!validId(item.id))return {ok:false,message:"Invalid campaign identifier."};
 if(item.contentIds.some(id=>!validId(id)))return {ok:false,message:"Invalid linked content."};
 const db=await serverClient();
 const row={title:item.title.trim(),start_date:item.startDate,end_date:item.endDate,audience:item.audience,status:item.status,notification_text:item.notificationText.trim(),content_ids:item.contentIds};
 const result=item.id?await db.from("studio_campaigns").update(row).eq("id",item.id).select("id").single():await db.from("studio_campaigns").insert(row).select("id").single();
 if(result.error)return {ok:false,message:"Could not save campaign. Please retry."};
 revalidatePath("/studio");return {ok:true,message:"Campaign saved. No notification was sent."};
}
