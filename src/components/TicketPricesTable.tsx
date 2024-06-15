import { LanguageContext } from "@/lib/language";
import { useContext } from "react";

const i18nEnglish = {
  "Ticket Type": "Ticket Type",
  "Workshop": "Workshop",
  "Local (Brazil)": "Local (Brazil)",
  "Local (Argentina)": "Local (Argentina)",
  "Regional": "Regional",
  "International": "International",
  "Ticket B2B": "Ticket B2B",
  "Gala Dinner": "Gala Dinner",
  "Excursion Belém do Pará": "Excursion Belém do Pará",
  "Speakers Ticket": "Speakers Ticket",
  "Early Bird": "Early Bird",
  "Full Price": "Full Price"
}

function USD({v} : { v: number} ) {
  return <><span className="text-gray-800 text-xs">US$ </span>{v}</>
}

function BRL({v} : { v: number} ) {
  return <><span className="text-gray-800 text-xs">R$ </span>{v}</>
}

export default function TicketPricesTable({i18n = i18nEnglish} : {i18n: typeof i18nEnglish}) {
  const { language } = useContext(LanguageContext)


  return <table className="border-collapse border-spacing-x-2">
    <thead>
      <tr className="font-bold border-b border-b-black text-center">
        <td className="px-2 py-1 text-left">{i18n["Ticket Type"]}</td>
        <td className="px-2 py-1">
          {i18n["Early Bird"]}
          <div className="text-xs">(USD)</div>
          </td>
        <td className="px-2 py-1">
          {i18n["Full Price"]}
          <div className="text-xs">(USD)</div>
        </td>
        <td className="px-2 py-1">
          {i18n["Early Bird"]}
          <div className="text-xs">(BRL)</div>
        </td>
        <td className="px-2 py-1">
          {i18n["Full Price"]}
          <div className="text-xs">(BRL)</div>
        </td>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-gray-300">
        <td className="px-2 py-1">{i18n["Local (Brazil)"]}</td>
        <td className="px-2 py-1"><USD v={149} /></td>
        <td className="px-2 py-1"><USD v={249} /></td>
        <td className="px-2 py-1"><BRL v={801} /></td>
        <td className="px-2 py-1"><BRL v={1339} /></td>
      </tr>
      <tr className="border-b border-gray-300">
        <td className="px-2 py-1">{i18n["Local (Argentina)"]}</td>
        <td className="px-2 py-1"><USD v={100} /></td>
        <td className="px-2 py-1"><USD v={230} /></td>
        <td className="px-2 py-1"><BRL v={538} /></td>
        <td className="px-2 py-1"><BRL v={1237} /></td>
      </tr>
      <tr className="border-b border-gray-300">
        <td className="px-2 py-1">{i18n["Regional"]}</td>
        <td className="px-2 py-1"><USD v={249} /></td>
        <td className="px-2 py-1"><USD v={349} /></td>
        <td className="px-2 py-1"><BRL v={1339} /></td>
        <td className="px-2 py-1"><BRL v={1877} /></td>
      </tr>
      <tr className="border-b border-gray-300">
        <td className="px-2 py-1">{i18n["International"]}</td>
        <td className="px-2 py-1"><USD v={349} /></td>
        <td className="px-2 py-1"><USD v={468} /></td>
        <td className="px-2 py-1"><BRL v={1877} /></td>
        <td className="px-2 py-1"><BRL v={2517} /></td>
      </tr>
      <tr className="border-b border-gray-300">
        <td className="px-2 py-1">{i18n["Speakers Ticket"]}</td>
        <td className="px-2 py-1"><USD v={100} /></td>
        <td className="px-2 py-1">-</td>
        <td className="px-2 py-1"><BRL v={538} /></td>
        <td className="px-2 py-1">-</td>
      </tr>
      <tr className="border-b border-gray-300">
        <td className="px-2 py-1">{i18n["Workshop"]}</td>
        <td className="px-2 py-1"><USD v={49} /></td>
        <td className="px-2 py-1"><USD v={69} /></td>
        <td className="px-2 py-1"><BRL v={263} /></td>
        <td className="px-2 py-1"><BRL v={371} /></td>
      </tr>
      <tr className="border-b border-gray-300">
        <td className="px-2 py-1">{i18n["Ticket B2B"]}</td>
        <td className="px-2 py-1">-</td>
        <td className="px-2 py-1"><USD v={20} /></td>
        <td className="px-2 py-1">-</td>
        <td className="px-2 py-1"><BRL v={100} /></td>
      </tr>
      <tr className="border-b border-gray-300">
        <td className="px-2 py-1">{i18n["Gala Dinner"]}</td>
        <td className="px-2 py-1">-</td>
        <td className="px-2 py-1"><USD v={50} /></td>
        <td className="px-2 py-1">-</td>
        <td className="px-2 py-1"><BRL v={269} /></td>
      </tr>
      <tr className="border-b border-gray-300">
        <td className="px-2 py-1">{i18n["Excursion Belém do Pará"]}</td>
        <td className="px-2 py-1"><USD v={85} /></td>
        <td className="px-2 py-1"><USD v={90} /></td>
        <td className="px-2 py-1"><BRL v={457} /></td>
        <td className="px-2 py-1"><BRL v={484} /></td>
      </tr>
    </tbody>
  </table>
}