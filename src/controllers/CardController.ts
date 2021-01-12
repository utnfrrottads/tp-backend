import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  JsonController,
  QueryParams,
} from "routing-controllers";
import { Card } from "../entities/Card";
import { CardService } from "../services/CardService";

@JsonController("/cards")
export class CardController {
  private cardService = new CardService();

  @Get("/")
  getAll(@QueryParams() query: Card) {
    return this.cardService.find(query);
  }

  @Get("/:id")
  getOne(@Param("id") id: string) {
    return this.cardService.findById(id);
  }

  @Post("/")
  post(@Body() card: Card) {
    return this.cardService.create(card);
  }

  @Put("/:id")
  put(@Param("id") id: string, @Body() card: Card) {
    const safeEntity = {...card,id}
    return this.cardService.update(id,safeEntity);
  }

  @Delete("/:id")
  remove(@Param("id") id: string) {
    return this.cardService.deleteById(id)
  }
}
