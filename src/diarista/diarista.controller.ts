import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Redirect,
  Render,
  Req,
  Request,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Diarista } from './diarista.entity';

@Controller('diaristas')
export class DiaristaController {
  constructor(
    @InjectRepository(Diarista)
    private diaristaRepository: Repository<Diarista>,
  ) {}
  @Get()
  @Render('listar_diaristas')
  async listarDiaristas() {
    return {
      diaristas: await this.diaristaRepository.find(),
      titulo: 'Lista de diaristas',
    };
  }

  @Get(':id/edit')
  @Render('edit')
  async edit(@Param('id') id: number) {
    const diarista = await this.diaristaRepository.findOneBy({ id: id });

    return { diarista: diarista };
  }

  @Patch(':id')
  @Redirect('/diaristas')
  async update(@Param('id') id: number, @Req() request: Request) {
    const diarista = await this.diaristaRepository.findOneBy({ id: id });

    diarista.nome = request.body['nome'];
    diarista.endereco = request.body['endereco'];
    diarista.idade = request.body['idade'];

    return await this.diaristaRepository.save(diarista);
  }

  @Get('show/:id')
  @Render('detalhes')
  async exibirDiarista(@Param('id') id: number) {
    return {
      diarista: await this.diaristaRepository.findOneBy({ id: id }),
      titulo: 'Diarista',
    };
  }

  @Get('create')
  @Render('create')
  createView() {
    //
  }

  @Post()
  @Redirect('/diaristas')
  async create(@Req() request: Request) {
    const diarista = new Diarista();
    diarista.nome = request.body['nome'];
    diarista.endereco = request.body['endereco'];
    diarista.idade = request.body['idade'];

    return await this.diaristaRepository.save(diarista);
  }

  @Delete(':id')
  @Redirect('/diaristas')
  async delete(@Param('id') id: number) {
    return await this.diaristaRepository.delete(id);
  }
}
