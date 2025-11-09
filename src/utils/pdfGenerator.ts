import jsPDF from 'jspdf';
import { GeneratedItinerary } from '../types/travel';

export async function generatePDF(itinerary: GeneratedItinerary, fromLocation?: string): Promise<void> {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 15;
  const cardPadding = 7;
  const cardSpacing = 10;
  const sectionSpacing = 5;
  const cardWidth = pageWidth - 2 * margin;

  // Load logo image
  const getLogoDataUrl = async () => {
    const response = await fetch('/logo.png');
    const blob = await response.blob();
    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  };

  let logoDataUrl: string | null = null;
  try {
    logoDataUrl = await getLogoDataUrl();
  } catch (e) {
    console.warn("Logo image not loaded:", e);
  }

  let yPosition = margin;

  const addLogo = () => {
    if (logoDataUrl) {
      const logoWidth = 50;
      const logoHeight = 20;
      pdf.addImage(logoDataUrl, 'PNG', (pageWidth - logoWidth) / 2, 5, logoWidth, logoHeight);
      yPosition = 5 + logoHeight + 5;
    }
  };

  addLogo();

  // Title
  pdf.setFontSize(24);
  pdf.setTextColor(108, 63, 197);
  pdf.setFont(undefined, 'bold');
  pdf.text(`${itinerary.destination ?? ''} Travel Itinerary`, pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 15;
  pdf.setFont(undefined, 'normal');

  // Basic Info
  pdf.setFontSize(13);
  pdf.setTextColor(52, 73, 94);
  if (fromLocation) {
    pdf.text(`From: ${fromLocation}`, margin, yPosition);
    yPosition += 7;
  }
  pdf.text(`Duration: ${itinerary.duration ?? ''}`, margin, yPosition);
  pdf.text(`Total Budget: ${itinerary.totalBudget ?? ''}`, pageWidth - margin - 60, yPosition);
  yPosition += 10;

  // Days loop
  for (const day of itinerary.days ?? []) {
    const actCount = day.activities?.length ?? 0;
    const flightCount = day.flights?.length ?? 0;
    const transferCount = day.transfers?.length ?? 0;

    const estCardHeight = 40 + actCount * 15 + flightCount * 10 + transferCount * 10;

    if (yPosition + estCardHeight > pageHeight - margin) {
      pdf.addPage();
      addLogo();
      yPosition = margin;
    }

    pdf.setFillColor(247, 245, 251);
    pdf.roundedRect(margin, yPosition, cardWidth, estCardHeight, 6, 6, 'F');

    let cardY = yPosition + cardPadding;

    // Day title
    pdf.setFontSize(16);
    pdf.setTextColor(108, 63, 197);
    pdf.setFont(undefined, 'bold');
    const dayTitle = day?.title?.replace(/^Day \d+ - /, '') ?? '';
    pdf.text(`Day ${day?.day ?? ''}: ${dayTitle}`, margin + cardPadding, cardY);
    cardY += 8;

    // Date
    pdf.setFontSize(11);
    pdf.setTextColor(127, 140, 141);
    pdf.setFont(undefined, 'normal');
    pdf.text(`${day?.date ?? ''}`, margin + cardPadding, cardY);
    cardY += 8;

    // Activities
    if (Array.isArray(day.activities) && day.activities.length > 0) {
      pdf.setFontSize(12);
      pdf.setTextColor(41, 128, 185);
      pdf.setFont(undefined, 'bold');
      pdf.text('Activities', margin + cardPadding, cardY);
      cardY += 6;
      pdf.setFont(undefined, 'normal');
      pdf.setFontSize(10);
      pdf.setTextColor(52, 73, 94);

      for (const activity of day.activities) {
        pdf.text(`${activity?.time ?? ''}  ${activity?.activity ?? ''}`, margin + cardPadding + 2, cardY);
        cardY += 4.5;

        pdf.setTextColor(127, 140, 141);
        const descLines = pdf.splitTextToSize(`${activity?.description ?? ''}`, cardWidth - 2 * cardPadding - 10);
        pdf.text(descLines, margin + cardPadding + 6, cardY);
        cardY += descLines.length * 4;

        pdf.setTextColor(39, 174, 96);
        pdf.text(`Cost: ${activity?.cost ?? ''}`, margin + cardPadding + 6, cardY);
        cardY += 5.5;
        pdf.setTextColor(52, 73, 94);
      }
      cardY += sectionSpacing;
    }

    // Flights
    if (Array.isArray(day.flights) && day.flights.length > 0) {
      pdf.setFontSize(12);
      pdf.setTextColor(34, 197, 94);
      pdf.setFont(undefined, 'bold');
      pdf.text('Flights', margin + cardPadding, cardY);
      cardY += 6;
      pdf.setFont(undefined, 'normal');
      pdf.setFontSize(10);
      pdf.setTextColor(52, 73, 94);

      for (const flight of day.flights) {
        pdf.text(`Airline: ${flight?.airline ?? ''}  No: ${flight?.flightNumber ?? ''}`, margin + cardPadding + 2, cardY);
        cardY += 4.5;
        pdf.text(`Departure: ${flight?.departure ?? ''}  Arrival: ${flight?.arrival ?? ''}  Price: ${flight?.price ?? ''}`, margin + cardPadding + 6, cardY);
        cardY += 5.5;
      }
      cardY += sectionSpacing;
    }

    // Transfers
    if (Array.isArray(day.transfers) && day.transfers.length > 0) {
      pdf.setFontSize(12);
      pdf.setTextColor(59, 130, 246);
      pdf.setFont(undefined, 'bold');
      pdf.text('Transfers', margin + cardPadding, cardY);
      cardY += 6;
      pdf.setFont(undefined, 'normal');
      pdf.setFontSize(10);
      pdf.setTextColor(52, 73, 94);

      for (const transfer of day.transfers) {
        pdf.text(`Type: ${transfer?.type ?? ''}  Time: ${transfer?.time ?? ''}  Price: ${transfer?.price ?? ''}  People: ${transfer?.peopleAllowed ?? ''}`, margin + cardPadding + 2, cardY);
        cardY += 5.5;
      }
      cardY += sectionSpacing;
    }

    // Day Total
    pdf.setFontSize(11);
    pdf.setTextColor(108, 63, 197);
    pdf.setFont(undefined, 'bold');
    pdf.text(`Day Total: ${day?.totalCost ?? ''}`, margin + cardWidth - cardPadding - 50, cardY);

    yPosition += estCardHeight + cardSpacing;
  }

  // Recommendations Section
  const recommendations = itinerary.recommendations ?? [];
  if (recommendations.length > 0) {
    if (yPosition + 40 > pageHeight - margin) {
      pdf.addPage();
      addLogo();
      yPosition = margin;
    }

    pdf.setFillColor(233, 244, 255);
    pdf.roundedRect(margin, yPosition, cardWidth, 35 + (recommendations.length * 7), 6, 6, 'F');

    let recY = yPosition + cardPadding + 2;
    pdf.setFontSize(14);
    pdf.setTextColor(41, 128, 185);
    pdf.setFont(undefined, 'bold');
    pdf.text('Travel Recommendations', margin + cardPadding, recY);
    recY += 8;
    pdf.setFont(undefined, 'normal');
    pdf.setFontSize(10);
    pdf.setTextColor(52, 73, 94);

    for (const recommendation of recommendations) {
      const recLines = pdf.splitTextToSize(`${recommendation}`, cardWidth - 2 * cardPadding - 10);
      pdf.text('•', margin + cardPadding + 2, recY);
      pdf.text(recLines, margin + cardPadding + 7, recY);
      recY += recLines.length * 4.5 + 2;
    }
  }

  pdf.save(`${itinerary.destination ?? 'travel'}-itinerary.pdf`);
}
