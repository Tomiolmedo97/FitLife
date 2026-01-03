
import React, { useState } from 'react';
import { analyzeMedia } from '../services/geminiService';

const MediaAnalyzer: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setIsLoading(true);
    setAnalysis('');

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Data = (reader.result as string).split(',')[1];
      const mimeType = file.type;
      const prompt = mimeType.startsWith('image/') 
        ? "Analyze this fitness-related image. Provide feedback on form, meal nutrition, or equipment if visible."
        : "Analyze this exercise video. Provide detailed form correction tips and identify the exercise.";

      try {
        const result = await analyzeMedia(prompt, base64Data, mimeType);
        setAnalysis(result || 'No analysis available.');
      } catch (err) {
        setAnalysis('Analysis failed. Please ensure your file is a valid image or video and check your API key.');
      } finally {
        setIsLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-surface-dark p-6 rounded-2xl border border-primary/20 flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <span className="material-symbols-outlined text-primary">document_scanner</span>
        <h3 className="text-xl font-bold text-white">AI Vision Coach</h3>
      </div>
      
      <p className="text-text-dim text-sm">Upload a photo of your meal or a video of your lifting form for real-time AI feedback.</p>

      <div className="flex flex-col gap-4">
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-primary/20 rounded-xl cursor-pointer hover:bg-primary/5 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <span className="material-symbols-outlined text-primary/50 text-4xl mb-2">upload_file</span>
            <p className="text-xs text-text-dim">{file ? file.name : "Select Image or Video"}</p>
          </div>
          <input type="file" className="hidden" accept="image/*,video/*" onChange={handleFileChange} />
        </label>

        <button
          onClick={handleAnalyze}
          disabled={!file || isLoading}
          className="w-full bg-primary hover:bg-primary-hover disabled:bg-surface-accent disabled:text-text-dim text-background-dark font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all"
        >
          {isLoading ? (
            <span className="animate-spin material-symbols-outlined">sync</span>
          ) : (
            <span className="material-symbols-outlined">analytics</span>
          )}
          {isLoading ? "Analyzing..." : "Analyze Media"}
        </button>
      </div>

      {analysis && (
        <div className="mt-4 p-4 bg-background-dark/50 rounded-xl border border-primary/10">
          <h4 className="text-primary text-xs font-bold uppercase mb-2">AI Analysis Results</h4>
          <div className="text-sm text-white whitespace-pre-wrap leading-relaxed">
            {analysis}
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaAnalyzer;
