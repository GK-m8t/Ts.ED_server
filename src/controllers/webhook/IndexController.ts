import { Controller } from "@tsed/di";
import { Get } from "@tsed/schema";

@Controller("/")
export class IndexController {
  @Get("/")
  get() {
    return {
      title: "3dHoudini",
      description: "webhook",
      routes: ["/card", "/crypto"]
    };
  }
}
