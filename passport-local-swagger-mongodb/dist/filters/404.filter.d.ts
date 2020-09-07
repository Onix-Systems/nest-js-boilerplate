import { ExceptionFilter, NotFoundException, ArgumentsHost } from '@nestjs/common';
export default class NotFoundExceptionFilter implements ExceptionFilter {
    catch(exception: NotFoundException, host: ArgumentsHost): void;
}
