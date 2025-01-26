import { GumloopClient } from "gumloop";
import { PatientInfo } from "@/types";
import { json } from "stream/consumers";

// Initialize the client
const client = new GumloopClient({
  apiKey: process.env.NEXT_PUBLIC_GUMLOOP_API_KEY ?? '',
  userId: process.env.NEXT_PUBLIC_USER_ID ?? '',
});


export async function fetchPatientInfo(input_id: string): Promise<PatientInfo> {

  try {
    const rawOutput = await client.runFlow(process.env.NEXT_PUBLIC_WORKFLOW_ID ?? '', {
      id: input_id,
    });

    const jsonString = JSON.stringify(rawOutput['output']);
    const pre_output = JSON.parse(jsonString);
    const output = JSON.parse(pre_output);

    console.log("OUTPUT", output['id']);
    
    // Clean and transform the data
    return {
        id: output.id,
        triage_category: Number(output.triage_category),
        queue_position_global: Number(output.queue_position_global),
        estimated_wait: Number(output.estimated_wait),
        status_by_phase: output.status_by_phase,
        investigations: output.investigations
      };
  } catch (error) {
    console.error("Flow execution failed:", error);
    throw error;
  }
}

export async function checkPatientID(input_id: string): Promise<boolean> {

    try {
      const rawOutput = await client.runFlow(process.env.NEXT_PUBLIC_PATIENT_ID ?? '', {
        id: input_id,
      });
  
      const jsonString = JSON.stringify(rawOutput['output']);
      const pre_output = JSON.parse(jsonString);
      const output = JSON.parse(pre_output);
  
      console.log("OUTPUT FOR PAITIENT ID", output);
      
      // Clean and transform the data
      return output as boolean ;
    } catch (error) {
      console.error("Flow execution failed:", error);
      throw error;
    }
  }
  