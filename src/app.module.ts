import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CatalogModule } from './catalog/catalog.module';
import { OrderModule } from './order/order.module';
import { ParinationModule } from './parination/parination.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { StatisticsModule } from './statistics/statistics.module';
import { UserModule } from './user/user.module';
import { OrderItemModule } from './order-item/order-item.module';

@Module({
  imports: [
    UserModule,
    ProductModule,
    ReviewModule,
    OrderModule,
    AuthModule,
    StatisticsModule,
    ParinationModule,
    CatalogModule,
    OrderItemModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
