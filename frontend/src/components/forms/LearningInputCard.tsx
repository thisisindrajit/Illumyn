"use client";

import { useState } from "react";
import { Card } from "../ui/Card";
import { PreferenceSelect } from "./PreferenceSelect";
import { FileUploadIcon } from "../icons/FileUploadIcon";
import { cn } from "@/lib/utils";

interface LearningInputCardProps {
  onGenerate?: (data: {
    topic: string;
    format: string;
    duration: string;
    focus: string;
    difficulty: string;
    file?: File;
  }) => void;
}

export const LearningInputCard = ({ onGenerate }: LearningInputCardProps) => {
  const [topic, setTopic] = useState("");
  const [format, setFormat] = useState("Course");
  const [duration, setDuration] = useState("Short");
  const [focus, setFocus] = useState("Breadth");
  const [difficulty, setDifficulty] = useState("Beginner");
  const [file, setFile] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim() && !file) return;
    
    setIsGenerating(true);
    try {
      await onGenerate?.({
        topic,
        format,
        duration,
        focus,
        difficulty,
        file: file || undefined
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <Card className="p-4">
      <div className="space-y-4">
        {/* Input Area */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-primary font-semibold">?</span>
          </div>
          <div className="flex-1">
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="I want to know about..."
              className="w-full bg-transparent border-0 resize-none text-xl placeholder:text-muted-foreground focus:outline-none min-h-[60px] transition-colors duration-200"
              rows={3}
            />
          </div>
        </div>
        
        {/* Preferences Row */}
        <div className="flex items-center gap-4 px-2 py-2 text-sm flex-wrap">
          <PreferenceSelect
            label="Format"
            value={format}
            onChange={setFormat}
            options={["Course", "Block"]}
          />
          <PreferenceSelect
            label="Duration"
            value={duration}
            onChange={setDuration}
            options={["Short", "Long"]}
          />
          <PreferenceSelect
            label="Focus"
            value={focus}
            onChange={setFocus}
            options={["Breadth", "Depth"]}
          />
          <PreferenceSelect
            label="Difficulty"
            value={difficulty}
            onChange={setDifficulty}
            options={["Beginner", "Intermediate", "Advanced"]}
          />
        </div>
        
        {/* Action Bar */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-4">
            <label className="cursor-pointer p-2 hover:bg-primary/10 rounded-full transition-colors duration-200">
              <input
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={handleFileChange}
                className="hidden"
              />
              <FileUploadIcon className="w-5 h-5 text-primary" />
            </label>
            {file && (
              <span className="text-xs text-muted-foreground">
                {file.name}
              </span>
            )}
          </div>
          
          <button 
            onClick={handleGenerate}
            disabled={(!topic.trim() && !file) || isGenerating}
            className={cn(
              "px-6 py-2 bg-primary text-primary-foreground rounded-full font-medium transition-colors duration-200",
              "hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            {isGenerating ? "Generating..." : "Generate"}
          </button>
        </div>
      </div>
    </Card>
  );
};