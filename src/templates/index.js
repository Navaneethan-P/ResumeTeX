import { modernMinimal } from './modernMinimal.js'
import { corporateTraditional } from './corporateTraditional.js'
import { creativeDesign } from './creativeDesign.js'
import { academicCV } from './academicCV.js'
import { technicalEngineering } from './technicalEngineering.js'
import { executive } from './executive.js'

export const templates = [
  modernMinimal,
  corporateTraditional,
  creativeDesign,
  academicCV,
  technicalEngineering,
  executive,
]

export const getTemplate = (id) => templates.find((t) => t.id === id) || templates[0]
