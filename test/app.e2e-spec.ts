import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/tasks (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/tasks')
      .send({ title: 'Test Task', description: 'Test Description' })
      .expect(201);
    expect(response.body.title).toBe('Test Task');
    expect(response.body.description).toBe('Test Description');
    expect(response.body.id).toBeDefined();
    expect(typeof response.body.id).toBe('number');
  });

  it('/tasks (GET)', async () => {
    // First create a task
    await request(app.getHttpServer())
      .post('/tasks')
      .send({ title: 'Test Task', description: 'Test Description' })
      .expect(201);

    // Then get all tasks
    const response = await request(app.getHttpServer())
      .get('/tasks')
      .expect(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].title).toBe('Test Task');
    expect(response.body[0].description).toBe('Test Description');
    expect(response.body[0].id).toBeDefined();
  });

  afterAll(async () => {
    await app.close();
  });
});
