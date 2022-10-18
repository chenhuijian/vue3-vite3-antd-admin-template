import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer";

import userMocks from '../user.js'
import enterprise from '../enterprise.js'

export default function setupProdMockServer() {
  createProdMockServer([...userMocks,...enterprise]);
}
