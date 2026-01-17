import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Loader2, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  role: z.string().optional(),
  message: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSuccess(true);
        reset();
      }
    } catch (error) {
      console.error("Contact form error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="p-8 bg-success-muted border border-success/20 rounded-2xl text-center">
        <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
        <h3 className="text-xl font-serif text-success mb-2">Message Sent!</h3>
        <p className="text-muted-foreground">Joseph will be in touch soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-muted-foreground mb-2">
            Name *
          </label>
          <input
            {...register("name")}
            className={cn(
              "w-full px-4 py-3 bg-secondary rounded-xl border text-foreground",
              errors.name
                ? "border-destructive"
                : "border-border focus:border-accent"
            )}
            placeholder="Your name"
          />
          {errors.name && (
            <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm text-muted-foreground mb-2">
            Email *
          </label>
          <input
            {...register("email")}
            type="email"
            className={cn(
              "w-full px-4 py-3 bg-secondary rounded-xl border text-foreground",
              errors.email
                ? "border-destructive"
                : "border-border focus:border-accent"
            )}
            placeholder="you@company.com"
          />
          {errors.email && (
            <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-muted-foreground mb-2">
            Company
          </label>
          <input
            {...register("company")}
            className="w-full px-4 py-3 bg-secondary rounded-xl border border-border focus:border-accent text-foreground"
            placeholder="Your company"
          />
        </div>
        <div>
          <label className="block text-sm text-muted-foreground mb-2">
            Role
          </label>
          <input
            {...register("role")}
            className="w-full px-4 py-3 bg-secondary rounded-xl border border-border focus:border-accent text-foreground"
            placeholder="Your role"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-muted-foreground mb-2">
          Message
        </label>
        <textarea
          {...register("message")}
          rows={4}
          className="w-full px-4 py-3 bg-secondary rounded-xl border border-border focus:border-accent text-foreground resize-none"
          placeholder="What would you like to discuss?"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-3 bg-accent text-accent-foreground rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
};

export default ContactForm;
