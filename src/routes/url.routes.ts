import { Router } from "express";
import { UrlController } from "../controller/url.controller";

const urlRoutes: Router = Router();

urlRoutes.post("/shorten", UrlController.createShortUrl);
urlRoutes.get("/:shortCode", UrlController.redirectToOriginalUrl);

export default urlRoutes;
