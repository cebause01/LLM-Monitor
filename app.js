import React, { useState } from 'react';

// Main App component
const App = () => {
  // Sample data for LLM performance results
  // In a real application, this data would likely be fetched from a backend or database.
  const [results, setResults] = useState([
    {
      id: 1,
      model: 'gemini-2.0-flash',
      prompt: 'Summarize the latest research on personalized medicine for kidney disease patients, focusing on breakthroughs in genetic therapies and the ethical considerations involved.',
      output: 'Personalized medicine for kidney disease is advancing with breakthroughs in genetic therapies. These therapies aim to target specific genetic predispositions that contribute to kidney disease progression. Ethical considerations primarily revolve around data privacy for genetic information, equitable access to expensive therapies, and the potential for genetic discrimination. Research highlights promising gene editing techniques and gene expression modulation to correct or mitigate disease pathways.',
      issue: 'The summary omitted key ethical considerations regarding data privacy in genetic research.',
    },
    {
      id: 2,
      model: 'claude-3-opus-20240229',
      prompt: 'Write a detailed patient education article about managing peritoneal dialysis at home, including common complications, how to recognize them, and when to contact a healthcare professional.',
      output: 'Managing peritoneal dialysis (PD) at home involves careful adherence to your treatment plan. Common complications include peritonitis (infection of the peritoneum), fluid overload, and catheter site issues. Symptoms of peritonitis include cloudy dialysate, abdominal pain, fever, and nausea; contact your doctor immediately if these occur. Fluid overload symptoms are swelling, shortness of breath, and high blood pressure; report these to your nurse. Catheter site issues like redness, pain, or pus also warrant immediate medical attention. Always wash hands thoroughly before and after exchanges, and maintain a sterile environment to prevent infections. Keep a detailed record of your exchanges and fluid balance for your healthcare team.',
      issue: 'Content was generally good but lacked specific actionable steps for emergency situations.',
    },
    {
      id: 3,
      model: 'gpt-4o-2024-05-13',
      prompt: 'Generate five unique and engaging social media posts for World Kidney Day, targeting a general audience and encouraging early screening for kidney disease.',
      output: '1. Your kidneys work tirelessly! This World Kidney Day, take a moment to appreciate them. Learn about early screening and keep them healthy! #WorldKidneyDay #KidneyHealth\n2. Did you know 1 in 10 adults worldwide has kidney disease? Most don\'t even know it! Get screened, stay informed. #CheckYourKidneys #WKD\n3. Small steps for big health! Hydrate, eat well, and know your risk for kidney disease. World Kidney Day reminds us to prioritize kidney care. #KidneyAwareness\n4. Your kidneys are vital filters! This World Kidney Day, let\'s talk about prevention. Simple screening can save lives. #PreventCKD #HealthyKidneys\n5. Don\'t wait for symptoms! Early detection is key for kidney disease. Celebrate World Kidney Day by scheduling a check-up. #KidneyCare #GlobalHealth',
      issue: 'Some posts used overly technical jargon that might not resonate with a general audience.',
    },
    {
      id: 4,
      model: 'gemini-2.0-flash',
      prompt: 'Explain the mechanism of action of new SGLT2 inhibitors in chronic kidney disease management for a medical professional audience. Include recent clinical trial data.',
      output: 'SGLT2 inhibitors primarily reduce glucose reabsorption in the renal tubules by inhibiting the sodium-glucose co-transporter 2 (SGLT2), leading to increased glucose excretion in urine. In CKD, beyond glycemic control, they offer renoprotective and cardioprotective benefits. This includes reduction in intraglomerular pressure, improvement in tubuloglomerular feedback, and anti-inflammatory effects. Recent trials like DAPA-CKD (2020) demonstrated significant reductions in kidney disease progression and cardiovascular events in patients with CKD, with or without type 2 diabetes. EMPA-KIDNEY (2022) further confirmed these benefits across a broader range of CKD patients.',
      issue: 'The response provided outdated clinical trial data; did not include the most recent studies.',
    },
    {
      id: 5,
      model: 'claude-3-opus-20240229',
      prompt: 'Develop a script for a chatbot designed to answer common questions from new peritoneal dialysis patients. Include responses for questions about diet, fluid restrictions, and signs of infection.',
      output: 'Chatbot Script:\n\n**User:** "What can I eat on PD?"\n**Chatbot:** "A balanced diet is crucial for PD patients. We generally recommend reducing salt, phosphorus, and potassium. Your dietitian will provide a personalized plan, but focusing on lean proteins, fresh vegetables, and whole grains is a good start."\n\n**User:** "How much fluid can I drink?"\n**Chatbot:** "Fluid restrictions vary based on your residual kidney function and fluid removal during PD. Your healthcare team will advise your specific daily fluid limit. Always measure your fluid intake carefully."\n\n**User:** "How do I know if I have an infection?"\n**Chatbot:** "Signs of infection (peritonitis) include cloudy dialysate fluid, abdominal pain, fever, nausea, or redness/pain at your catheter site. If you experience any of these symptoms, please contact your PD nurse or doctor immediately. Do not wait."',
      issue: 'The chatbot responses were too generic and lacked empathy for new patients.',
    },
    {
      id: 6,
      model: 'gpt-4o-2024-05-13',
      prompt: 'Create a case study based on a hypothetical patient with end-stage renal disease, detailing their treatment journey, challenges faced, and the role of multidisciplinary care.',
      output: 'Case Study: Mr. John Doe\n\nMr. John Doe, a 68-year-old male, presented with end-stage renal disease (ESRD) secondary to long-standing uncontrolled hypertension and diabetes. His GFR had progressively declined, necessitating initiation of renal replacement therapy. After extensive discussions with his nephrologist, Mr. Doe opted for hemodialysis. His treatment journey was marked by challenges including fluid management issues, access complications (recurrent fistula stenosis), and dietary adherence struggles.\n\nThe multidisciplinary care team, comprising a nephrologist, dialysis nurse, dietitian, social worker, and psychologist, played a pivotal role. The dietitian provided tailored meal plans to manage his diabetes and fluid intake. The social worker assisted with transportation to dialysis appointments and linked him to support groups. The psychologist helped address the emotional burden of chronic illness. Regular team meetings ensured coordinated care and adjustments to his treatment plan based on his evolving needs and preferences.',
      issue: 'The case study was well-written but did not adequately emphasize the multidisciplinary care aspect.',
    },
  ]);

  // State for managing the modal visibility and content
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');

  // Function to open the modal with specific content
  const openModal = (title, content) => {
    setModalTitle(title);
    setModalContent(content);
    setShowModal(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
    setModalTitle('');
    setModalContent('');
  };

  // Helper function to truncate text for display
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans antialiased">
      {/* Tailwind CSS CDN - IMPORTANT: This would typically be part of a build process in a full React app */}
      <script src="https://cdn.tailwindcss.com"></script>
      {/* Configure Inter font */}
      <style>
        {`
          body {
            font-family: 'Inter', sans-serif;
          }
        `}
      </style>

      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-xl p-6 md:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center md:text-left">
          LLM Performance Dashboard
        </h1>

        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:px-6"
                >
                  Model
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:px-6"
                >
                  Prompt
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:px-6"
                >
                  Output
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:px-6"
                >
                  Issue
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {results.map((result) => (
                <tr key={result.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap md:px-6">
                    <div className="text-sm text-gray-900">
                      {truncateText(result.model, 20)}
                    </div>
                    <button
                      onClick={() => openModal('Model Details', result.model)}
                      className="mt-1 text-blue-600 hover:text-blue-800 text-xs font-medium rounded-full py-1 px-2 transition duration-150 ease-in-out"
                    >
                      View Full Model
                    </button>
                  </td>
                  <td className="px-4 py-4 md:px-6">
                    <div className="text-sm text-gray-900">
                      {truncateText(result.prompt, 50)}
                    </div>
                    <button
                      onClick={() => openModal('Full Prompt', result.prompt)}
                      className="mt-1 text-blue-600 hover:text-blue-800 text-xs font-medium rounded-full py-1 px-2 transition duration-150 ease-in-out"
                    >
                      View Full Prompt
                    </button>
                  </td>
                  <td className="px-4 py-4 md:px-6">
                    <div className="text-sm text-gray-900">
                      {truncateText(result.output, 50)}
                    </div>
                    <button
                      onClick={() => openModal('Full Output', result.output)}
                      className="mt-1 text-blue-600 hover:text-blue-800 text-xs font-medium rounded-full py-1 px-2 transition duration-150 ease-in-out"
                    >
                      View Full Output
                    </button>
                  </td>
                  <td className="px-4 py-4 md:px-6">
                    <div className="text-sm text-gray-900">
                      {result.issue}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Component */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg md:max-w-2xl lg:max-w-3xl overflow-hidden animate-fade-in-up">
            <div className="flex justify-between items-center bg-blue-600 text-white p-4 md:p-5 rounded-t-xl">
              <h3 className="text-xl font-semibold">{modalTitle}</h3>
              <button
                onClick={closeModal}
                className="text-white hover:text-gray-200 text-2xl"
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>
            <div className="p-4 md:p-6 max-h-[70vh] overflow-y-auto">
              <p className="text-gray-800 whitespace-pre-wrap">{modalContent}</p>
            </div>
            <div className="p-4 md:p-5 bg-gray-50 border-t border-gray-200 flex justify-end rounded-b-xl">
              <button
                onClick={closeModal}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out shadow-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Tailwind animation for modal */}
      <style>{`
        @keyframes fadeInScaleUp {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in-up {
          animation: fadeInScaleUp 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
