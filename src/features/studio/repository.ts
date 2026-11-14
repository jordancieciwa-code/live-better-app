import {serverClient} from "@/lib/auth/server";
import type {Campaign,ContentItem} from "./types";
export async function loadStudio(){
 const db=await serverClient();
 const [a,b]=await Promise.all([
  db.from("studio_content").select("id,title,kind,pillar,description,url,status").order("updated_at",{ascending:false}),
  db.from("studio_campaigns").select("id,title,start_date,end_date,audience,status,notification_text,content_ids").order("updated_at",{ascending:false})
 ]);
 if(a.error||b.error)throw new Error("Studio database is unavailable. Check migrations and permissions.");
 const content=(a.data??[]) as ContentItem[];
 const campaigns:Campaign[]=(b.data??[]).map(x=>({id:x.id,title:x.title,startDate:x.start_date,endDate:x.end_date,audience:x.audience,status:x.status,notificationText:x.notification_text,contentIds:x.content_ids??[]}));
 return {content,campaigns};
}
